import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardsModule } from './cards/cards.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'pass123',
      database: 'screen_cards',
      autoLoadEntities: true,
      synchronize: true,
      logging: false,
    }),
    CardsModule,
    AuthModule,
  ],
})
export class AppModule {}
