import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CommodityModule } from './commodity/commodity.module';
import { SupplierModule } from './supplier/supplier.module';
import { CompanyModule } from './company/company.module';
import { CustomerModule } from './customer/customer.module';
import { OrderModule } from './order/order.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as autoPopulate from 'mongoose-autopopulate';
import { EmployerModule } from './employer/employer.module';

@Module({
    imports: [
        AuthModule,
        CommodityModule,
        SupplierModule,
        CompanyModule,
        CustomerModule,
        OrderModule,
        EmployerModule,
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                uri: configService.get<string>('MONGODB_URI'),
                connectionFactory: (connection: any) => {
                    connection.plugin(autoPopulate);
                    return connection;
                },
            }),
            inject: [ConfigService],
        }),
        AutomapperModule.forRoot({
            strategyInitializer: classes(),
        }),
        ConfigModule.forRoot({ isGlobal: true }),
    ],
})
export class AppModule {}
