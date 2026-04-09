import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
import { CommonModule } from '@libs/common';
import { PrismaModule } from '@libs/database';
import { EventsModule } from '@libs/events';
import { KitchenService } from './services/kitchen.service';
import { KitchenController } from './controllers/kitchen.controller';
import { HealthController } from './controllers/health.controller';
import { OrderListener } from './listeners/order.listener';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TerminusModule,
    CommonModule,
    PrismaModule,
    EventsModule,
  ],
  controllers: [KitchenController, HealthController],
  providers: [KitchenService, OrderListener],
  exports: [KitchenService],
})
export class AppModule {}
