import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entities/item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ItemsService {
	constructor(
		@InjectRepository(Item)
		private itemsRepository: Repository<Item>
	) { }

  async create(createItemDto: CreateItemDto): Promise<Item> {
		const existingItem = await this.itemsRepository.findOne({where: {title: createItemDto.title}})

		if (existingItem) {
			throw new ConflictException(`Item with title "${createItemDto.title}" already exists`)
		}

		const newItem = this.itemsRepository.create(createItemDto);

    return this.itemsRepository.save(newItem);
  }

  findAll(isAvailableQuery?: string): Promise<Item[]> {
		let isAvailable = true;

		if (isAvailableQuery !== undefined) {
			isAvailable = isAvailableQuery === 'true';
		}

		return this.itemsRepository.find({
			where: {isAvailable}
		});
  }

  async findOne(id: number): Promise<Item> {
		const item = await this.itemsRepository.findOne({where: {id}})

		if (!item) {
			throw new NotFoundException(`Item with ID "${id}" not found`);
		}
    return item;
  }

  async update(id: number, updateItemDto: UpdateItemDto): Promise<Item> {
		const item = await this.findOne(id);

		if (updateItemDto.title && updateItemDto.title !== item.title ) {
			const existingTitle = await this.itemsRepository.findOne({ where: { title: updateItemDto.title } })
			if (existingTitle) {
				throw new ConflictException(`Item with title "${updateItemDto.title}" already exists`);
			}
		}

		const updatedItem = this.itemsRepository.merge(item, updateItemDto);

    return this.itemsRepository.save(updatedItem);
  }

	async remove(id: number): Promise<void> {
		const result = await this.itemsRepository.delete(id);

		if (result.affected === 0) {
			throw new NotFoundException(`Item with ID "${id}" not found`)
		}
  }
}
