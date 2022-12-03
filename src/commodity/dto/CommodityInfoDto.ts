import { Schema } from 'mongoose';

export class CommodityInfoDto {
    constructor(
        id: Schema.Types.ObjectId,
        name: string,
        lastPrice: number,
        lastOrder?: Date,
    ) {
        this.id = id;
        this.name = name;
        this.lastPrice = lastPrice;
        this.lastOrder = lastOrder;
    }
    id: Schema.Types.ObjectId;
    name: string;
    lastPrice: number;
    lastOrder?: Date;
}
