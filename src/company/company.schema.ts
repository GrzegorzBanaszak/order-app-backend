import { AutoMap } from '@automapper/classes';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as SchemaType } from 'mongoose';

export type CompanyDocument = Company & Document;

@Schema({ timestamps: true })
export class Company {
    @AutoMap()
    @Prop({ auto: true })
    _id: SchemaType.Types.ObjectId;

    @AutoMap()
    @Prop()
    name: string;

    @AutoMap()
    @Prop()
    nip: string;

    @Prop()
    createdAt: Date;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
