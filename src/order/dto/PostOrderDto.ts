import { Type } from 'class-transformer';
import {
    ArrayMinSize,
    IsArray,
    IsNotEmpty,
    IsNumber,
    ValidateIf,
    ValidateNested,
} from 'class-validator';
import { Schema } from 'mongoose';
import { PostOrderCommodityDto } from './PostOrderCommodityDto';

export class PostOrderDto {
    @IsNotEmpty({ message: 'Pole klient jest wymagane' })
    customer: Schema.Types.ObjectId;

    @IsArray()
    @ValidateNested()
    @ArrayMinSize(1, { message: 'Musisz podać przynajmniej jeden towar' })
    @Type(() => PostOrderCommodityDto)
    commodities: Array<PostOrderCommodityDto>;

    @ValidateIf((o) => o.advance !== undefined)
    @IsNumber({}, { message: 'Pole zaliszki jest nieotpowiedniego formatu' })
    advance?: number;

    @IsNotEmpty({ message: 'Pole status jest wymagane' })
    status: string;

    orderNumber: string;
}
