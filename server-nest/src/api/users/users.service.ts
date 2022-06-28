import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterUserDTO } from '../dto/user-register.dto';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  registerUser(registerUserDto: RegisterUserDTO): Promise<UserDocument> {
    const user = new this.userModel(registerUserDto);
    return user.save();
  }
}
