import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
	constructor(
		@InjectRepository(Category)
		private categoryRepository: Repository<Category>,
	) { }

	async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
		const existing = await this.categoryRepository.findOne({ where: { name: createCategoryDto.name } });
		if (existing) {
			throw new ConflictException(`Category with name "${createCategoryDto.name}" already exists`);
		}
		const category = this.categoryRepository.create(createCategoryDto);
		return this.categoryRepository.save(category);
	}

	findAll(): Promise<Category[]> {
		return this.categoryRepository.find();
	}

	async findOne(id: number): Promise<Category> {
		const category = await this.categoryRepository.findOne({ where: { id } });
		if (!category) {
			throw new NotFoundException(`Category with ID ${id} not found`);
		}
		return category;
	}

	async update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
		const category = await this.findOne(id);
		this.categoryRepository.merge(category, updateCategoryDto);
		return this.categoryRepository.save(category);
	}

	async remove(id: number): Promise<void> {
		const result = await this.categoryRepository.delete(id);
		if (result.affected === 0) {
			throw new NotFoundException(`Category with ID ${id} not found`);
		}
	}
}
