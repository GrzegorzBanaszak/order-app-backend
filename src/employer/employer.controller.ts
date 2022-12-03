import { Employer } from './employer.schema';
import { MapInterceptor } from '@automapper/nestjs';
import {
    Body,
    Controller,
    Get,
    Post,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ObjectId } from 'mongodb';
import { ParseObjectIdPipe } from 'src/pipes/parseObjectId.pipe';
import { User } from 'src/user/user.decorator';
import { EmployerService } from './employer.service';
import { EmployerDto } from './dto/EmployerDto';

@UseGuards(AuthGuard('jwt'))
@Controller('employer')
export class EmployerController {
    constructor(private employerService: EmployerService) {}

    @Get()
    @UseInterceptors(MapInterceptor(Employer, EmployerDto, { isArray: true }))
    async getAll(@User('userId', ParseObjectIdPipe) id: ObjectId) {
        return await this.employerService.getAll(id);
    }

    @Post('add')
    async add(
        @User('userId', ParseObjectIdPipe) id: ObjectId,
        @Body() data: any,
    ) {
        return await this.employerService.add(data.name, id);
    }
}
