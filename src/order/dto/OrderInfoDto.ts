import { AutoMap } from '@automapper/classes';
import { Schema } from 'mongoose';

export class OrderInfoDto {
    @AutoMap()
    id: Schema.Types.ObjectId;

    @AutoMap()
    orderNumber: string;

    @AutoMap()
    createdAt: Date;

    @AutoMap()
    status: string;

    quantity: number;

    totalPrice: number;
}
