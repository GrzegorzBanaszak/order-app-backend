import { ObjectId } from 'mongodb';
import { Commodity, CommodityDocument } from './commodity.schema';
import {
    HttpException,
    HttpStatus,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
    CommodityDetailDto,
    CommodityInfoDto,
    CommoditySupplier,
    PostCommodityDto,
} from './dto';
import { Order, OrderDocument } from 'src/order/order.schema';

@Injectable()
export class CommodityService {
    constructor(
        @InjectModel(Commodity.name)
        private commodityModel: Model<CommodityDocument>,
        @InjectModel(Order.name)
        private orderModel: Model<OrderDocument>,
    ) {}

    async getAll(): Promise<CommodityInfoDto[]> {
        const commodities = await this.commodityModel.find().sort('-createdAt');

        const commoditisInfo = new Array<CommodityInfoDto>(0);

        for (const commodity of commodities) {
            const order = await this.orderModel
                .findOne({
                    'commodities.commodity': commodity._id.toString(),
                })
                .sort('createdAt')
                .populate({
                    path: 'commodities',
                    populate: {
                        path: 'commodity',
                        model: 'Commodity',
                    },
                });

            if (order) {
                const commodityLastPrice = order.commodities.find(
                    (x) => x.commodity.name === commodity.name,
                )?.price;

                if (commodityLastPrice) {
                    commoditisInfo.push(
                        new CommodityInfoDto(
                            commodity._id,
                            commodity.name,
                            commodityLastPrice,
                            order.createdAt,
                        ),
                    );
                }
            } else {
                commoditisInfo.push(
                    new CommodityInfoDto(commodity._id, commodity.name, 0),
                );
            }
        }

        return commoditisInfo;
    }

    async getById(id: ObjectId): Promise<CommodityDetailDto> {
        try {
            const commodity = await this.commodityModel.findById(id);

            if (!commodity) {
                throw new NotFoundException();
            }

            const orders = await this.orderModel
                .find({
                    'commodities.commodity': id.toString(),
                })
                .populate({
                    path: 'commodities',
                    populate: {
                        path: 'commodity',
                        model: 'Commodity',
                    },
                })
                .populate({
                    path: 'commodities',
                    populate: {
                        path: 'supplier',
                        model: 'Supplier',
                    },
                });

            const suppliers = new Map<any, CommoditySupplier>();

            if (orders.length > 0) {
                orders.forEach((order) => {
                    order.commodities.forEach((c) => {
                        if (!suppliers.get(c.supplier._id)) {
                            suppliers.set(
                                c.supplier._id,
                                new CommoditySupplier(
                                    c.supplier._id,
                                    c.supplier.name,
                                ),
                            );
                        }
                    });
                });

                return new CommodityDetailDto(
                    commodity._id,
                    commodity.name,
                    commodity.description,
                    Array.from(suppliers, ([key, value]) => value),
                    commodity.indexNumber ? commodity.indexNumber : '',
                );
            } else {
                return new CommodityDetailDto(
                    commodity._id,
                    commodity.name,
                    commodity.description,
                    [],
                    commodity.indexNumber ? commodity.indexNumber : '',
                );
            }
        } catch (error) {
            throw new Error(error);
        }
    }

    async add(data: PostCommodityDto): Promise<Commodity> {
        const commodity = new this.commodityModel(data);
        return await commodity.save();
    }

    async update(id: string, data: PostCommodityDto): Promise<Commodity> {
        const updatedCommodity = await this.commodityModel.findByIdAndUpdate(
            id,
            data,
            {
                new: true,
            },
        );

        if (!updatedCommodity) {
            throw new NotFoundException();
        }

        return updatedCommodity;
    }

    async delete(id: ObjectId): Promise<Commodity> {
        const orders = await this.orderModel.find({
            'commodities.commodity': id.toString(),
        });

        if (orders.length > 0) {
            throw new HttpException(
                'Nie można usunąć towaru który posiada zamówienia',
                HttpStatus.FORBIDDEN,
            );
        }

        const data = await this.commodityModel.findByIdAndDelete(id);

        if (!data) {
            throw new HttpException(
                'Nie udało sie usunąć towaru',
                HttpStatus.BAD_REQUEST,
            );
        }
        return data;
    }
}
