import { CustomerProfile } from './customer.profile';
import { Customer, CustomerSchema } from './customer.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { OrderModule } from 'src/order/order.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Customer.name, schema: CustomerSchema },
        ]),
        OrderModule,
    ],
    providers: [CustomerService, CustomerProfile],
    controllers: [CustomerController],
    exports: [MongooseModule],
})
export class CustomerModule {}
