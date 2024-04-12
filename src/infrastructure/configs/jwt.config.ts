import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const secret = config.get('jwt.atKey');
        const expiresIn = config.get('jwt.expireIn');

        return {
          secret,
          signOptions: { expiresIn },
        };
      },
    }),
  ],
})
export class JwtConfigModule {}
