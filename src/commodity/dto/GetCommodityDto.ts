import { AutoMap } from '@automapper/classes';
import { Schema } from 'mongoose';

export class GetCommodityDto {
    @AutoMap()
    _id: Schema.Types.ObjectId;

    @AutoMap()
    name: string;

    @AutoMap()
    indexNumber?: string;

    @AutoMap()
    description?: string;
}
