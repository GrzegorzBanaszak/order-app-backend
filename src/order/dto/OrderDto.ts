import { AutoMap } from '@automapper/classes';
import { Schema } from 'mongoose';

export class OrderDto {
    @AutoMap()
    id: Schema.Types.ObjectId;

    @AutoMap()
    orderNumber: string;

    @AutoMap()
    createdAt: Date;

    @AutoMap()
    status: string;

    quantity: number;

    customer: string;

    @AutoMap()
    advance: number;

    totalPrice: number;
}
