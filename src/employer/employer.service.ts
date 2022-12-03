import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';
import { Employer, EmployerDocument } from './employer.schema';

@Injectable()
export class EmployerService {
    constructor(
        @InjectModel(Employer.name)
        private employerModel: Model<EmployerDocument>,
    ) {}

    async getAll(id: ObjectId) {
        const employers = await this.employerModel.find({
            user: id,
        });

        return employers;
    }

    async add(name: string, id: ObjectId) {
        const employer = new this.employerModel({
            name,
            user: id,
        });

        return await employer.save();
    }
}
