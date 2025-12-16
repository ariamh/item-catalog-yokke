import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Item {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ unique: true })
	title: string;

	@Column()
	category: string;

	@Column('decimal')
	price: number;

	@Column({default: true})
	isAvailable?: boolean
}
