import { AutoMap } from '@automapper/classes';
import { Schema } from 'mongoose';
import { CompanyDto } from 'src/company/dto';

export class CustomerDto {
    @AutoMap()
    id: Schema.Types.ObjectId;

    @AutoMap()
    name: string;

    @AutoMap()
    phoneNumber: string;

    @AutoMap()
    company: CompanyDto;
}
