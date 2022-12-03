import { ObjectId } from 'mongodb';
import { ParseObjectIdPipe } from '../pipes/parseObjectId.pipe';
import { Order } from './order.schema';
import { PostOrderDto } from './dto/PostOrderDto';
import { OrderService } from './order.service';
import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Put,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { MapInterceptor } from '@automapper/nestjs';
import { AuthGuard } from '@nestjs/passport';
import { OrderDetailDto, OrderDto, OrderInfoDto } from './dto';

@UseGuards(AuthGuard('jwt'))
@Controller('order')
export class OrderController {
    constructor(private orderService: OrderService) {}

    @Get()
    @UseInterceptors(MapInterceptor(Order, OrderDto, { isArray: true }))
    async getAll() {
        return await this.orderService.getAll();
    }

    @Get(':id')
    @UseInterceptors(MapInterceptor(Order, OrderDetailDto))
    async getById(@Param('id', ParseObjectIdPipe) id: ObjectId) {
        return await this.orderService.getById(id);
    }

    @Get('last/:range')
    @UseInterceptors(MapInterceptor(Order, OrderDto, { isArray: true }))
    async getAtRange(@Param('range', ParseIntPipe) range: number) {
        return await this.orderService.getAtRange(range);
    }

    @Get('best/customers')
    async getBestCustomers() {
        return await this.orderService.getBestCustomers();
    }

    @Get('best/commodities')
    async getBestCommodities() {
        return await this.orderService.getBestCommodities();
    }

    @Get(':type/:id')
    @UseInterceptors(MapInterceptor(Order, OrderInfoDto, { isArray: true }))
    async getOrdersByCustomer(
        @Param('id', ParseObjectIdPipe) id: ObjectId,
        @Param('type') type: string,
    ) {
        return await this.orderService.getOrdersByType(id, type);
    }

    @Post('add')
    async add(@Body() data: PostOrderDto) {
        return await this.orderService.add(data);
    }

    @Patch(':id/:status')
    @UseInterceptors(MapInterceptor(Order, OrderDetailDto))
    async updateStatus(
        @Param('id', ParseObjectIdPipe) id: ObjectId,
        @Param('status') status: string,
    ) {
        return await this.orderService.updateStatus(id, status);
    }

    @Put('update/:id')
    @UseInterceptors(MapInterceptor(Order, OrderDetailDto))
    async updateOrder(
        @Param('id', ParseObjectIdPipe) id: ObjectId,
        @Body() data: PostOrderDto,
    ) {
        return await this.orderService.updateOrder(id, data);
    }
}
