import { OrderDetailCommodity } from 'src/commodity/dto';
import { OrderInfoDto, OrderDto, OrderDetailDto } from './dto';
import {
    Mapper,
    MappingProfile,
    createMap,
    forMember,
    mapFrom,
} from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { Order } from './order.schema';

@Injectable()
export class OrderProfile extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    override get profile(): MappingProfile {
        return (mapper) => {
            createMap(
                mapper,
                Order,
                OrderInfoDto,
                forMember(
                    (d) => d.quantity,
                    mapFrom((source) => {
                        return source.commodities.reduce(
                            (prev, curr) => prev + curr.quantity,
                            0,
                        );
                    }),
                ),
                forMember(
                    (d) => d.id,
                    mapFrom((source) => source._id),
                ),
                forMember(
                    (d) => d.totalPrice,
                    mapFrom((source) => {
                        return source.commodities.reduce(
                            (prev, curr) => prev + curr.price * curr.quantity,
                            0,
                        );
                    }),
                ),
            );
            createMap(
                mapper,
                Order,
                OrderDto,
                forMember(
                    (d) => d.quantity,
                    mapFrom((source) => {
                        return source.commodities.reduce(
                            (prev, curr) => prev + curr.quantity,
                            0,
                        );
                    }),
                ),
                forMember(
                    (d) => d.id,
                    mapFrom((source) => source._id),
                ),
                forMember(
                    (d) => d.totalPrice,
                    mapFrom((source) => {
                        return source.commodities.reduce(
                            (prev, curr) => prev + curr.price * curr.quantity,
                            0,
                        );
                    }),
                ),
                forMember(
                    (d) => d.customer,
                    mapFrom((source) => source.customer.name),
                ),
            );
            createMap(
                mapper,
                Order,
                OrderDetailDto,
                forMember(
                    (d) => d.id,
                    mapFrom((source) => source._id),
                ),
                forMember(
                    (d) => d.commodities,
                    mapFrom((source) => {
                        const mapedCommodities = source.commodities.map(
                            (item) => {
                                return new OrderDetailCommodity(
                                    item.commodity._id,
                                    item.commodity.name,
                                    item.commodity.description,
                                    item.price,
                                    item.quantity,
                                    item.deliveryPrice,
                                    item.supplier.name,
                                    item.supplier._id,
                                );
                            },
                        );

                        return mapedCommodities;
                    }),
                ),
            );
        };
    }
}
