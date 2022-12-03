import { Schema } from 'mongoose';

export class SupplierCommodityInfo {
    id: Schema.Types.ObjectId;
    name: string;
    quantity: number;
    price: number;
}
