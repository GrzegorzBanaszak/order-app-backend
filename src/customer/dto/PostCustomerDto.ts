import { AutoMap } from '@automapper/classes';
import { IsMongoId, IsNotEmpty, IsString, ValidateIf } from 'class-validator';
import { Schema } from 'mongoose';

export class PostCustomerDto {
    @AutoMap()
    @IsString()
    @IsNotEmpty({ message: 'Podaj imie i nazwisko' })
    name: string;

    @AutoMap()
    @IsString()
    @IsNotEmpty({ message: 'Podaj numer telefonu' })
    phoneNumber: string;

    @AutoMap()
    @ValidateIf((o) => o.company !== null)
    @IsMongoId()
    company?: Schema.Types.ObjectId;
}
