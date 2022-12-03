import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) {}

    async createUser(email: string, hash: string): Promise<User> {
        try {
            const user = await new this.userModel({
                email,
                hash,
            });
            return await user.save();
        } catch (error) {
            throw new ForbiddenException(error);
        }
    }

    async findUser(email: string): Promise<User | null> {
        return await this.userModel.findOne({ email: email });
    }

    async getById(id: string): Promise<User | null> {
        return await this.userModel.findById(id);
    }
}
