import { AutoMap } from '@automapper/classes';
import { Schema as SchemaType } from 'mongoose';

export class GetSupplierDto {
    @AutoMap()
    _id: SchemaType.Types.ObjectId;
    @AutoMap()
    name: string;
    @AutoMap()
    price: number;
}
