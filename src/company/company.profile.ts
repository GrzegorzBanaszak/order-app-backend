import { GetCompanyDto } from './dto/GetCompanyDto';
import {
    Mapper,
    MappingProfile,
    createMap,
    forMember,
    mapFrom,
} from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { Company } from './company.schema';
import { CompanyDto } from './dto';

@Injectable()
export class CompanyProfile extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    override get profile(): MappingProfile {
        return (mapper) => {
            createMap(mapper, Company, GetCompanyDto);
            createMap(
                mapper,
                Company,
                CompanyDto,
                forMember(
                    (output) => output.id,
                    mapFrom((source) => source._id),
                ),
            );
        };
    }
}
