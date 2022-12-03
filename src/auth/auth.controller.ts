import { GetUser } from './../user/dto/GetUser';
import { User } from './../user/user.schema';
import { MapInterceptor } from '@automapper/nestjs';
import { AuthService } from './auth.service';
import {
    Body,
    Controller,
    Get,
    Post,
    Request,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { PostUserDto, RegisterPostDto } from 'src/user/dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    async login(@Body() data: PostUserDto) {
        return this.authService.login(data);
    }

    @Post('register')
    async register(@Body() data: RegisterPostDto) {
        return this.authService.register(data);
    }
    @UseGuards(AuthGuard('jwt'))
    @Get('me')
    @UseInterceptors(MapInterceptor(User, GetUser))
    async getMe(@Request() req: any) {
        return await this.authService.getUser(req.user.userId);
    }
}
