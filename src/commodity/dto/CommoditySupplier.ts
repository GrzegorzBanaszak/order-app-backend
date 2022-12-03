import { Schema } from 'mongoose';

export class CommoditySupplier {
    constructor(id: Schema.Types.ObjectId, name: string) {
        this.id = id;
        this.name = name;
    }
    id: Schema.Types.ObjectId;
    name: string;
}
