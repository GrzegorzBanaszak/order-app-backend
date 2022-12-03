import { AutoMap } from '@automapper/classes';
import { IsNotEmpty } from 'class-validator';

export class PostCompanyDto {
    @AutoMap()
    @IsNotEmpty({ message: 'Prosze podać nazwę firmy' })
    name: string;

    @AutoMap()
    @IsNotEmpty({ message: 'Prosze podać nip' })
    nip: string;
}
