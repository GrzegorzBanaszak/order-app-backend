import { Supplier } from './supplier.schema';
import { MapInterceptor } from '@automapper/nestjs';
import { PostSupplierDto } from './dto/PostSupplierDto';
import { SupplierService } from './supplier.service';
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
import { GetSupplierDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { ParseObjectIdPipe } from 'src/pipes/parseObjectId.pipe';
import { ObjectId } from 'mongodb';

@UseGuards(AuthGuard('jwt'))
@Controller('supplier')
export class SupplierController {
    constructor(private supplierService: SupplierService) {}

    @Get()
    async getAll() {
        return await this.supplierService.getAll();
    }

    @Get(':id')
    async getDetail(@Param('id', ParseObjectIdPipe) id: ObjectId) {
        return await this.supplierService.getDetail(id);
    }

    @Post('add')
    @UseInterceptors(MapInterceptor(Supplier, GetSupplierDto))
    async add(@Body() data: PostSupplierDto) {
        return await this.supplierService.add(data);
    }

    @Put('update/:id')
    @UseInterceptors(MapInterceptor(Supplier, GetSupplierDto))
    async update(@Param() params: any, @Body() data: PostSupplierDto) {
        return await this.supplierService.update(params.id, data);
    }

    @Delete('delete/:id')
    async delete(@Param('id', ParseObjectIdPipe) id: ObjectId) {
        return await this.supplierService.delete(id);
    }
}
