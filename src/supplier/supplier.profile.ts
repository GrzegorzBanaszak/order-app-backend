import { Supplier } from './supplier.schema';
import {
    MappingProfile,
    createMap,
    Mapper,
    forMember,
    mapFrom,
} from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { GetSupplierDto, OrderDetailSupplier } from './dto';

@Injectable()
export class SupplierProfile extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    override get profile(): MappingProfile {
        return (mapper) => {
            createMap(mapper, Supplier, GetSupplierDto);
            createMap(
                mapper,
                Supplier,
                OrderDetailSupplier,
                forMember(
                    (d) => d.id,
                    mapFrom((s) => s._id),
                ),
            );
        };
    }
}
