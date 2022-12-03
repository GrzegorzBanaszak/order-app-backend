import { Schema } from 'mongoose';

export class OrderDetailCommodity {
    constructor(
        id: Schema.Types.ObjectId,
        name: string,
        description: string,
        price: number,
        quantity: number,
        deliveryPrice: number,
        supplierName: string,
        supplierId: Schema.Types.ObjectId,
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.quantity = quantity;
        this.deliveryPrice = deliveryPrice;
        this.supplierName = supplierName;
        this.supplierId = supplierId;
    }

    id: Schema.Types.ObjectId;
    name: string;
    description: string;
    price: number;
    quantity: number;
    supplierId: Schema.Types.ObjectId;
    supplierName: string;
    deliveryPrice: number;
}
