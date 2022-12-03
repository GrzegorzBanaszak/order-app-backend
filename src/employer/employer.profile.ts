import { Employer } from './employer.schema';
import {
    MappingProfile,
    createMap,
    forMember,
    mapFrom,
    Mapper,
} from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { EmployerDto } from './dto/EmployerDto';

@Injectable()
export class EmployerProfile extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    override get profile(): MappingProfile {
        return (mapper) => {
            createMap(
                mapper,
                Employer,
                EmployerDto,
                forMember(
                    (d) => d.id,
                    mapFrom((s) => s._id),
                ),
            );
        };
    }
}
