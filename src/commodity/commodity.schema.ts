import { AutoMap } from '@automapper/classes';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as SchemaType } from 'mongoose';

export type CommodityDocument = Commodity & Document;

@Schema({ timestamps: true })
export class Commodity {
    @AutoMap()
    @Prop({ auto: true })
    _id: SchemaType.Types.ObjectId;

    @AutoMap()
    @Prop({ required: true })
    name: string;

    @AutoMap()
    @Prop()
    description: string;

    @AutoMap()
    @Prop()
    indexNumber?: string;
}

export const CommoditySchema = SchemaFactory.createForClass(Commodity);
