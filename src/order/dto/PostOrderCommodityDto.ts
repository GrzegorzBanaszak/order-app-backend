import {  IsNotEmpty, IsNumber } from 'class-validator';
import { Schema } from 'mongoose';

export class PostOrderCommodityDto {
    @IsNotEmpty()
    commodity: Schema.Types.ObjectId;

    @IsNotEmpty()
    @IsNumber()
    price: number;

    @IsNotEmpty()
    @IsNumber()
    quantity: number;

    @IsNotEmpty()
    supplier: Schema.Types.ObjectId;

    @IsNotEmpty()
    @IsNumber()
    deliveryPrice: number;
}
