import { SupplierCommodityInfo } from './';
import { Schema } from 'mongoose';

export class SupplierDetailDto {
    constructor(
        id: Schema.Types.ObjectId,
        name: string,
        price: number,
        bestOrderCommodities: SupplierCommodityInfo[],
    ) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.bestOrderCommodities = bestOrderCommodities;
    }

    id: Schema.Types.ObjectId;
    name: string;
    price: number;
    bestOrderCommodities?: SupplierCommodityInfo[];
}
