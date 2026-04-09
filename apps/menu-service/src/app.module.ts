import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from '@libs/common';
import { PrismaModule } from '@libs/database';
import { RestaurantService } from './services/restaurant.service';
import { CategoryService } from './services/category.service';
import { MenuItemService } from './services/menu-item.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    CommonModule,
    PrismaModule,
  ],
  providers: [RestaurantService, CategoryService, MenuItemService],
  exports: [RestaurantService, CategoryService, MenuItemService],
})
export class AppModule {}
