import { OrderModule } from 'src/order/order.module';
import { Commodity, CommoditySchema } from './commodity.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { CommodityService } from './commodity.service';
import { CommodityController } from './commodity.controller';
import { Module } from '@nestjs/common';
import { CommadityProfile } from './commodity.profile';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Commodity.name, schema: CommoditySchema },
        ]),
        OrderModule,
    ],
    controllers: [CommodityController],
    providers: [CommodityService, CommadityProfile],
    exports: [MongooseModule],
})
export class CommodityModule {}
