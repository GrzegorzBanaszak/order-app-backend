import { ObjectId } from 'mongodb';
import { AuthGuard } from '@nestjs/passport';
import { PostCompanyDto } from './dto/PostComapnyDto';
import { GetCompanyDto } from './dto/GetCompanyDto';
import { Company } from './company.schema';
import { MapInterceptor } from '@automapper/nestjs';
import { CompanyService } from './company.service';
import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { ParseObjectIdPipe } from 'src/pipes/parseObjectId.pipe';

@UseGuards(AuthGuard('jwt'))
@Controller('company')
export class CompanyController {
    constructor(private companyService: CompanyService) {}

    @Get()
    async getAll() {
        return await this.companyService.getAll();
    }

    @Get(':id')
    async getDetail(@Param('id', ParseObjectIdPipe) id: ObjectId) {
        return await this.companyService.getDetail(id);
    }

    @Post('add')
    @UseInterceptors(MapInterceptor(Company, GetCompanyDto))
    async add(@Body() data: PostCompanyDto) {
        return await this.companyService.add(data);
    }

    @Put('update/:id')
    @UseInterceptors(MapInterceptor(Company, GetCompanyDto))
    async update(@Param() params: any, @Body() data: PostCompanyDto) {
        return await this.companyService.update(params.id, data);
    }

    @Delete('delete/:id')
    async delete(@Param() params: any) {
        return await this.companyService.delete(params.id);
    }
}
