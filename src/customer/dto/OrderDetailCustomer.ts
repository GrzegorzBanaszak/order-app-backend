import { AutoMap } from '@automapper/classes';
import { Schema } from 'mongoose';

export class OrderDetailCustomer {
    id: Schema.Types.ObjectId;

    @AutoMap()
    name: string;

    @AutoMap()
    phoneNumber: string;
}
