import { EmployerProfile } from './employer.profile';
import { Module } from '@nestjs/common';
import { EmployerController } from './employer.controller';
import { EmployerService } from './employer.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Employer, EmployerSchema } from './employer.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Employer.name, schema: EmployerSchema },
        ]),
    ],
    providers: [EmployerService, EmployerProfile],
    controllers: [EmployerController],
    exports: [MongooseModule],
})
export class EmployerModule {}
