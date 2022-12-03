import { AutoMap } from '@automapper/classes';
import { Schema } from 'mongoose';

export class CompanyDto {
    @AutoMap()
    id: Schema.Types.ObjectId;

    @AutoMap()
    name: string;

    @AutoMap()
    nip?: string;
}
