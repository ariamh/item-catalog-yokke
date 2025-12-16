import { Test, TestingModule } from '@nestjs/testing';
import { ItemsService } from './items.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { ItemCategory } from './dto/create-item.dto';
import { ConflictException } from '@nestjs/common';

describe('ItemsService', () => {
	let service: ItemsService;
	let repository;

	const mockItemsRepository = {
		create: jest.fn().mockImplementation((dto) => dto),
		save: jest.fn().mockImplementation((item) => Promise.resolve({id: Date.now(), ...item})),
		findOne: jest.fn(),
		find: jest.fn(),
	}

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
			providers: [ItemsService, {
				provide: getRepositoryToken(Item),
				useValue: mockItemsRepository,
			}],
    }).compile();

		service = module.get<ItemsService>(ItemsService);
		repository = module.get(getRepositoryToken(Item));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
	});

	it('should create a new item', async () => {
		const dto = {
			title: 'Unit Test Item',
			category: ItemCategory.ELECTRONICS,
			price: 1000000
		}

		repository.findOne.mockResolvedValue(null);

		const result = await service.create(dto);

		expect(result).toEqual(expect.objectContaining({
			title: 'Unit Test Item',
			price: 1000000
		}));

		expect(repository.save).toHaveBeenCalled();
	})

	it('should throw ConflictException if title already exists', async () => {
		const dto = {
			title: 'Duplicate Item',
			category: ItemCategory.FOOD,
			price: 10000
		}

		repository.findOne.mockResolvedValue({id: 1, ...dto})

		await expect(service.create(dto)).rejects.toThrow(ConflictException)
	})
});
