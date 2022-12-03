import { Schema } from 'mongoose';

export class SupplierInfoDto {
    constructor(
        id: Schema.Types.ObjectId,
        name: string,
        price: number,
        numberOfOrders: number,
        lastOrder?: Date,
    ) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.numberOfOrders = numberOfOrders;
        this.lastOrder = lastOrder;
    }

    id: Schema.Types.ObjectId;
    name: string;
    price: number;
    lastOrder?: Date;
    numberOfOrders: number;
}
