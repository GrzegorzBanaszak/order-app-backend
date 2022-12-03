import { AutoMap } from '@automapper/classes';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as SchemaType } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop({ auto: true })
    _id: SchemaType.Types.ObjectId;

    @AutoMap()
    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    hash: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
