import { Module } from '@nestjs/common';
import { TypeOrmExModule } from 'src/db/typeorm-ex.decorator';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './security/passport.strategy';
@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([UserRepository]),
    JwtModule.register({
      secret: 'SECRET',
      signOptions: { expiresIn: '90d'},
    }),    
    PassportModule.register({defaultStrategy: 'jwt'}),
    AuthModule,
  ],
  exports: [TypeOrmExModule, PassportModule],
  controllers: [AuthController],
  providers: [AuthService, UserService, JwtModule, JwtStrategy]
})
export class AuthModule {}
