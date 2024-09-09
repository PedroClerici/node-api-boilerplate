import { Exclude, Transform, Type } from "class-transformer";

export class UserEntity {
	id!: number;
	username!: string;
	email!: string;

	// @Exclude({ toPlainOnly: true })
	createdAt!: string;

	// @Exclude({ toPlainOnly: true })
	updatedAt!: string;

	@Exclude({ toPlainOnly: true })
	password!: string;
}
