import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export enum ItemCategory {
	ELECTRONICS = 'ELECTRONICS',
	CLOTHING = 'CLOTHING',
	FOOD = 'FOOD',
}

export class CreateItemDto {
	@IsString()
	@IsNotEmpty()
	title: string;

	@IsEnum(ItemCategory, {
		message: 'Category must be one of ELECTRONICS, CLOTHING, FOOD'
	})
	category: ItemCategory;

	@IsNumber()
	@IsPositive()
	price: number;

	@IsOptional()
	@IsBoolean()
	isAvailable?: boolean;
}
