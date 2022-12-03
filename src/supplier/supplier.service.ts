import { Supplier, SupplierDocument } from './supplier.schema';
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostSupplierDto, SupplierInfoDto, SupplierDetailDto } from './dto';
import { Order, OrderDocument } from 'src/order/order.schema';
import { ObjectId } from 'mongodb';
import { orderBy } from 'lodash';

@Injectable()
export class SupplierService {
    constructor(
        @InjectModel(Supplier.name)
        private supplierModel: Model<SupplierDocument>,
        @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    ) {}

    async getAll(): Promise<SupplierInfoDto[]> {
        const suppliers = await this.supplierModel.find().sort('-createdAt');

        const suppliersInfo: SupplierInfoDto[] = [];

        for (const supplier of suppliers) {
            const orders = await this.orderModel
                .find({ 'commodities.supplier': supplier._id.toString() })
                .sort({ createdAt: 1 });
            if (orders.length > 0) {
                suppliersInfo.push(
                    new SupplierInfoDto(
                        supplier._id,
                        supplier.name,
                        supplier.price,
                        orders.length,
                        orders[0].createdAt,
                    ),
                );
            } else {
                suppliersInfo.push(
                    new SupplierInfoDto(
                        supplier._id,
                        supplier.name,
                        supplier.price,
                        0,
                    ),
                );
            }
        }

        return suppliersInfo;
    }

    async getDetail(id: ObjectId) {
        const supplier = await this.supplierModel.findById(id);
        const orders = await this.orderModel
            .find({ 'commodities.supplier': id.toString() })
            .populate({
                path: 'commodities',
                populate: {
                    path: 'commodity',
                    model: 'Commodity',
                },
            })
            .sort('-createdAt');

        if (!supplier) {
            throw new NotFoundException();
        }

        if (orders.length > 0) {
            const map = new Map<any, any>();

            orders.forEach((order) => {
                order.commodities.forEach((commodity) => {
                    if (!map.get(commodity.commodity._id)) {
                        map.set(commodity.commodity._id, {
                            name: commodity.commodity.name,
                            quantity: commodity.quantity,
                            price: commodity.price,
                        });
                    } else {
                        map.set(commodity.commodity._id, {
                            name: commodity.commodity.name,
                            quantity:
                                map.get(commodity.commodity._id).quantity +
                                commodity.quantity,
                            price: commodity.price,
                        });
                    }
                });
            });
            return new SupplierDetailDto(
                supplier._id,
                supplier.name,
                supplier.price,
                orderBy(
                    Array.from(map, ([key, value]) => ({
                        ...value,
                        id: key,
                    })),
                    'quantity',
                    'desc',
                ),
            );
        } else {
            return new SupplierDetailDto(
                supplier._id,
                supplier.name,
                supplier.price,
                [],
            );
        }
    }

    async add(data: PostSupplierDto): Promise<Supplier> {
        const supplier = new this.supplierModel(data);
        return await supplier.save();
    }

    async update(id: string, data: PostSupplierDto): Promise<Supplier> {
        const updatedSupplier = await this.supplierModel.findByIdAndUpdate(
            id,
            data,
            {
                new: true,
            },
        );

        if (!updatedSupplier) {
            throw new NotFoundException();
        }

        return updatedSupplier;
    }

    async delete(id: ObjectId): Promise<Supplier> {

        const orders = await this.orderModel
        .find({
            'commodities.supplier': id.toString(),
        })

        if(orders.length > 0){
            throw new HttpException(
                'Nie mozna usunąć dostawcy który posiada zamówienia',
                HttpStatus.FORBIDDEN,
            );
        }

        const data = await this.supplierModel.findByIdAndDelete({ _id: id });

        if (!data) {
            throw new HttpException(
                'Nie udało sie usunąć dostawcy',
                HttpStatus.BAD_REQUEST,
            );
        }

        return data;
    }
} 
