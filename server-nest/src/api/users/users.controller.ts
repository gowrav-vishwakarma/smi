import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RegisterUserDTO } from '../dto/user-register.dto';
import { UserDocument } from '../schemas/user.schema';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/register')
  @UsePipes(ValidationPipe)
  registerUser(
    @Body() registerUserDto: RegisterUserDTO,
  ): Promise<UserDocument> {
    return this.usersService.registerUser(registerUserDto);
  }
}
