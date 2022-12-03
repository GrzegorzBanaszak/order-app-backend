import { OrderProfile } from './order.profile';
import { Order, OrderSchema } from './order.schema';
import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    ],
    providers: [OrderService, OrderProfile],
    controllers: [OrderController],
    exports: [MongooseModule],
})
export class OrderModule {}
