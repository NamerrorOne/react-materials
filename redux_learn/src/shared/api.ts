const baseUrl = 'http://localhost:3000';
import { z } from 'zod';

const UserDtoSchema = z.object({
	id: z.string(),
	name: z.string(),
	description: z.string(),
});

export const api = {
	getUsers: () => {
		return fetch(`${baseUrl}/users`)
			.then((res) => res.json())
			.then((data) => UserDtoSchema.array().parse(data));
	},

	getUser: (userId: string) => {
		return fetch(`${baseUrl}/users/${userId}`)
			.then((res) => res.json())
			.then((data) => UserDtoSchema.parse(data));
	},

	deleteUser: (userId: string) => {
		return fetch(`${baseUrl}/users/${userId}`, {
			method: 'DELETE',
		}).then((res) => res.json());
	},
};
