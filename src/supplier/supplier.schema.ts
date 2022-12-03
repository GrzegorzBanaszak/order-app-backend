import { AutoMap } from '@automapper/classes';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Schema as SchemaType } from 'mongoose';

export type SupplierDocument = Supplier & Document;

@Schema({ timestamps: true })
export class Supplier {
    @AutoMap()
    @Prop({ auto: true })
    _id: SchemaType.Types.ObjectId;

    @AutoMap()
    @Prop({ required: true })
    name: string;

    @AutoMap()
    @Prop()
    price: number;

    @AutoMap()
    @Prop()
    createdAt?: Date;
}

export const SupplierSchema = SchemaFactory.createForClass(Supplier);
