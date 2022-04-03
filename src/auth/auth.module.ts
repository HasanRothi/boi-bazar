import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    JwtModule.register({
      signOptions: {
        expiresIn: process.env.JWT_EXPIRE_IN || '10m',
      },
      secret: process.env.JWT_SECRET || 'off-koto',
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
