import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisterPostDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;
}
