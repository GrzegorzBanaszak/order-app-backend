import { IsEmail, IsNotEmpty } from 'class-validator';

export class PostUserDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;
}
