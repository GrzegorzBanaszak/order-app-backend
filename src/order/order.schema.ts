import { Commodity } from './../commodity/commodity.schema';
import { Supplier } from './../supplier/supplier.schema';
import { AutoMap } from '@automapper/classes';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Schema as SchemaType } from 'mongoose';
import { Customer } from 'src/customer/customer.schema';
export type OrderDocument = Order & Document;

export class OrderCommodity {
    @Prop({
        type: SchemaType.Types.ObjectId,
        ref: 'Commodity',
        autopopulate: true,
    })
    commodity: Commodity;

    @Prop({
        type: SchemaType.Types.ObjectId,
        ref: 'Supplier',
    })
    supplier: Supplier;

    @Prop()
    price: number;

    @Prop()
    quantity: number;

    @Prop()
    deliveryPrice: number;
}

@Schema({ timestamps: true })
export class Order {
    @AutoMap()
    @Prop({ auto: true })
    _id: SchemaType.Types.ObjectId;

    @AutoMap()
    @Prop()
    orderNumber: string;

    @AutoMap()
    @Prop({
        type: SchemaType.Types.ObjectId,
        ref: 'Customer',
        autopopulate: true,
    })
    customer: Customer;

    @AutoMap()
    @Prop([OrderCommodity])
    commodities: OrderCommodity[];

    @AutoMap()
    @Prop()
    status: string;

    @AutoMap()
    @Prop()
    advance: number;

    @AutoMap()
    @Prop()
    createdAt: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
