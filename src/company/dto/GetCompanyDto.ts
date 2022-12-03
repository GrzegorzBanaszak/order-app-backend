import { AutoMap } from '@automapper/classes';
import { Schema } from 'mongoose';

export class GetCompanyDto {
    @AutoMap()
    _id: Schema.Types.ObjectId;
    @AutoMap()
    name: string;

    @AutoMap()
    nip: string;
}
