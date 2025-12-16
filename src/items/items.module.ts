import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { Category } from 'src/categories/entities/category.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Item, Category])],
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class ItemsModule {}
