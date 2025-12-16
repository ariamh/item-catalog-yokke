import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class CreateItemDto {
	@IsString()
	@IsNotEmpty()
	title: string;

	@IsString()
	@IsNotEmpty()
	category: string;

	@IsNumber()
	@IsPositive()
	price: number;

	@IsOptional()
	@IsBoolean()
	isAvailable?: boolean;
}
