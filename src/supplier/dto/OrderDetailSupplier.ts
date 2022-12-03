import { AutoMap } from '@automapper/classes';
import { Schema } from 'mongoose';

export class OrderDetailSupplier {
    id: Schema.Types.ObjectId;

    @AutoMap()
    name: string;

    @AutoMap()
    price: string;
}
