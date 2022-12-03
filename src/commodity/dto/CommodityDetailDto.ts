import { CommoditySupplier } from './';
import { Schema } from 'mongoose';

export class CommodityDetailDto {
    constructor(
        id: Schema.Types.ObjectId,
        name: string,
        description: string,
        suppliers: CommoditySupplier[],
        indexNumber: string,
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.suppliers = suppliers;
        this.indexNumber = indexNumber;
    }

    id: Schema.Types.ObjectId;
    name: string;
    description: string;
    suppliers: CommoditySupplier[];
    indexNumber: string;
}
