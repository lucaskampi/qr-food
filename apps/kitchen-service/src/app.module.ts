import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from '@libs/common';
import { PrismaModule } from '@libs/database';
import { KitchenService } from './services/kitchen.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    CommonModule,
    PrismaModule,
  ],
  providers: [KitchenService],
  exports: [KitchenService],
})
export class AppModule {}
