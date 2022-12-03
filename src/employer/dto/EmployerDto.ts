import { AutoMap } from '@automapper/classes';
import { Schema } from 'mongoose';

export class EmployerDto {
    id: Schema.Types.ObjectId;

    @AutoMap()
    name: string;
}
