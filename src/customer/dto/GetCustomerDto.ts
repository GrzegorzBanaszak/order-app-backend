import { AutoMap } from '@automapper/classes';
import { Schema } from 'mongoose';

export class GetCustomerDto {
    constructor(
        id: Schema.Types.ObjectId,
        name: string,
        phoneNumber: string,
        companyName: string,
        lastOrder?: Date,
    ) {
        this.id = id;
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.lastOrder = lastOrder;
        this.companyName = companyName;
    }

    @AutoMap()
    id: Schema.Types.ObjectId;

    @AutoMap()
    name: string;

    @AutoMap()
    phoneNumber: string;

    @AutoMap()
    companyName?: string;

    lastOrder?: Date;
}
