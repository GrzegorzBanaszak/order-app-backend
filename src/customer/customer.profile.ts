import { OrderDetailCustomer } from './dto/OrderDetailCustomer';
import { GetCustomerDto } from './dto/GetCustomerDto';
import { Customer } from './customer.schema';
import {
    createMap,
    forMember,
    mapFrom,
    Mapper,
    MappingProfile,
} from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { CustomerDto } from './dto';

@Injectable()
export class CustomerProfile extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    override get profile(): MappingProfile {
        return (mapper) => {
            createMap(mapper, Customer, GetCustomerDto);
            createMap(
                mapper,
                Customer,
                CustomerDto,
                forMember(
                    (output) => output.id,
                    mapFrom((source) => source._id),
                ),
            );
            createMap(
                mapper,
                Customer,
                OrderDetailCustomer,
                forMember(
                    (output) => output.id,
                    mapFrom((source) => source._id),
                ),
            );
        };
    }
}
