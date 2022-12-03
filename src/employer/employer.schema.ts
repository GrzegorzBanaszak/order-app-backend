import { Schema as SchemaType } from 'mongoose';
import { AutoMap } from '@automapper/classes';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from 'src/user/user.schema';

export type EmployerDocument = Employer & Document;

@Schema()
export class Employer {
    @Prop({ auto: true })
    _id: SchemaType.Types.ObjectId;

    @AutoMap()
    @Prop({ required: true })
    name: string;

    @Prop({
        type: SchemaType.Types.ObjectId,
        ref: 'User',
    })
    user: User;
}

export const EmployerSchema = SchemaFactory.createForClass(Employer);
