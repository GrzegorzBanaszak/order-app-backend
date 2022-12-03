import { AutoMap } from '@automapper/classes';
import { Schema } from 'mongoose';

export class CompanyInfoDto {
    constructor(
        id: Schema.Types.ObjectId,
        name: string,
        nip: string,
        employers: number,
        lastOrder?: Date,
    ) {
        this.id = id;
        this.name = name;
        this.nip = nip;
        this.employers = employers;
        this.lastOrder = lastOrder;
    }

    @AutoMap()
    id: Schema.Types.ObjectId;

    @AutoMap()
    name: string;

    @AutoMap()
    nip: string;

    lastOrder?: Date;

    employers: number;
}
