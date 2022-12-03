import { EmployerDto } from './';
import { AutoMap } from '@automapper/classes';
import { Schema } from 'mongoose';

export class CompanyDetailDto {
    constructor(
        id: Schema.Types.ObjectId,
        name: string,
        workers: EmployerDto[],
        nip?: string,
    ) {
        this.id = id;
        this.name = name;
        this.workers = workers;
        this.nip = nip;
    }

    @AutoMap()
    id: Schema.Types.ObjectId;

    @AutoMap()
    name: string;

    @AutoMap()
    nip?: string;

    workers: EmployerDto[];
}
