import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ApiModule } from 'src/api/api.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    JwtModule.register({
      secret: 'secretKey',
    }),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    ApiModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
