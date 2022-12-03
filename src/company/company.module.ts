import { CustomerModule } from './../customer/customer.module';
import { OrderModule } from 'src/order/order.module';
import { CompanyProfile } from './company.profile';
import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { Company, CompanySchema } from './company.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Company.name, schema: CompanySchema },
        ]),
        OrderModule,
        CustomerModule,
    ],
    providers: [CompanyService, CompanyProfile],
    controllers: [CompanyController],
})
export class CompanyModule {}
