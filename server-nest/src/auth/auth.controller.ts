import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LoginUserDTO } from 'src/api/dto/user-login.dto';
import { RegisterUserDTO } from 'src/api/dto/user-register.dto';
import { User } from 'src/api/schemas/user.schema';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UsePipes(ValidationPipe)
  loginUser(@Body() loginUserDTO: LoginUserDTO) {
    return this.authService.loginUser(loginUserDTO);
  }

  @Post('register')
  @UsePipes(ValidationPipe)
  registerUser(@Body() registerUserDTO: RegisterUserDTO): Promise<User> {
    return this.authService.registerUser(registerUserDTO);
  }
}
