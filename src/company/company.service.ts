import { CompanyDetailDto, EmployerDto } from './dto';
import { Order, OrderDocument } from 'src/order/order.schema';
import { CustomerDocument, Customer } from 'src/customer/customer.schema';
import { PostCompanyDto } from './dto/PostComapnyDto';
import { Company, CompanyDocument } from './company.schema';
import {
    HttpException,
    HttpStatus,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CompanyInfoDto } from './dto';
import { ObjectId } from 'mongodb';

@Injectable()
export class CompanyService {
    constructor(
        @InjectModel(Company.name) private companyModel: Model<CompanyDocument>,
        @InjectModel(Customer.name)
        private customerModel: Model<CustomerDocument>,
        @InjectModel(Order.name)
        private orderModel: Model<OrderDocument>,
    ) {}

    async getAll(): Promise<CompanyInfoDto[]> {
        const companies = await this.companyModel.find().sort('-createdAt');

        const companiesInfo: CompanyInfoDto[] = [];

        for (const company of companies) {
            const customersByCompany = await this.customerModel
                .find({ company: company._id })
                .select('name');

            if (customersByCompany.length > 0) {
                const lastOrder = await this.orderModel
                    .find({
                        customer: {
                            $in: customersByCompany.map((item) => item._id),
                        },
                    })
                    .sort('createdAt')
                    .limit(1);

                if (lastOrder.length > 0) {
                    companiesInfo.push(
                        new CompanyInfoDto(
                            company._id,
                            company.name,
                            company.nip,
                            customersByCompany.length,
                            lastOrder[0].createdAt,
                        ),
                    );
                } else {
                    companiesInfo.push(
                        new CompanyInfoDto(
                            company._id,
                            company.name,
                            company.nip,
                            customersByCompany.length,
                        ),
                    );
                }
            } else {
                companiesInfo.push(
                    new CompanyInfoDto(
                        company._id,
                        company.name,
                        company.nip,
                        0,
                    ),
                );
            }
        }

        return companiesInfo;
    }

    async getDetail(id: ObjectId) {
        const company = await this.companyModel.findById(id);

        if (!company) {
            throw new NotFoundException('Company dont exist');
        }

        const employiers = (await this.customerModel.find({ company: id })).map(
            (item) => {
                return new EmployerDto(item._id, item.name, item.phoneNumber);
            },
        );

        return new CompanyDetailDto(
            company._id,
            company.name,
            employiers,
            company.nip,
        );
    }

    async add(data: PostCompanyDto): Promise<Company> {
        const company = new this.companyModel(data);
        return await company.save();
    }

    async update(id: string, data: PostCompanyDto): Promise<Company> {
        const updatedCompany = await this.companyModel.findByIdAndUpdate(
            id,
            data,
            { new: true },
        );

        if (!updatedCompany) {
            throw new NotFoundException();
        }

        return updatedCompany;
    }

    async delete(id: string): Promise<Company> {
        const customers = await this.customerModel.find({ company: id });

        if (customers.length > 0) {
            throw new HttpException(
                'Nie można usunąć firmy który posiada pracowników',
                HttpStatus.FORBIDDEN,
            );
        }

        const data = await this.companyModel.findByIdAndDelete(id);

        if (!data) {
            throw new HttpException(
                'Nie udało sie usunąć firmy',
                HttpStatus.BAD_REQUEST,
            );
        }

        return data;
    }
}
