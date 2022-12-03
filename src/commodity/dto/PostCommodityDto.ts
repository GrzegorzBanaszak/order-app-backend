import { IsNotEmpty, IsString } from 'class-validator';

export class PostCommodityDto {
    @IsNotEmpty({ message: 'Podaj nazwę towaru' })
    @IsString()
    name: string;

    @IsString()
    indexNumber?: string;

    @IsString()
    description?: string;
}
