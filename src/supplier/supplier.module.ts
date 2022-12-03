import { OrderModule } from 'src/order/order.module';
import { SupplierProfile } from './supplier.profile';
import { Supplier, SupplierSchema } from './supplier.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { SupplierService } from './supplier.service';
import { Module } from '@nestjs/common';
import { SupplierController } from './supplier.controller';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Supplier.name, schema: SupplierSchema },
        ]),
        OrderModule,
    ],
    controllers: [SupplierController],
    providers: [SupplierService, SupplierProfile],
})
export class SupplierModule {}
