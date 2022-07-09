import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserDocument } from '../schemas/user.schema';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('details/:id')
  async getUser(@Param('id') id: string): Promise<UserDocument> {
    const user = await this.usersService.getUser(id);
    delete user.password;
    return user;
  }

  @Post('update-me')
  updateUser(@Body() user: any) {}
}
