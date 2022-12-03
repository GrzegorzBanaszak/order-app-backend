import { Schema } from 'mongoose';
export class EmployerDto {
    constructor(id: Schema.Types.ObjectId, name: string, phoneNumber: string) {
        this.id = id;
        this.name = name;
        this.phoneNumber = phoneNumber;
    }
    id: Schema.Types.ObjectId;
    name: string;
    phoneNumber: string;
}
