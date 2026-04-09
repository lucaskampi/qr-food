import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
import { CommonModule } from '@libs/common';
import { PrismaModule } from '@libs/database';
import { RestaurantService } from './services/restaurant.service';
import { CategoryService } from './services/category.service';
import { MenuItemService } from './services/menu-item.service';
import { RestaurantController } from './controllers/restaurant.controller';
import { CategoryController } from './controllers/category.controller';
import { MenuItemController } from './controllers/menu-item.controller';
import { HealthController } from './controllers/health.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TerminusModule,
    CommonModule,
    PrismaModule,
  ],
  controllers: [RestaurantController, CategoryController, MenuItemController, HealthController],
  providers: [RestaurantService, CategoryService, MenuItemService],
  exports: [RestaurantService, CategoryService, MenuItemService],
})
export class AppModule {}
