import { createAppSelector, type AppState } from '../../store';

export type UserId = string;
export type User = {
	id: UserId;
	name: string;
	description: string;
};

type UsersState = {
	entities: Record<UserId, User>;
	ids: UserId[];
	selectedUserId: UserId | undefined;
};

export const initialUsersList: User[] = Array.from(
	{ length: 3000 },
	(_, index) => {
		return {
			id: `user ${index}`,
			name: `User Name ${index}`,
			description: `This is user number ${index} description`,
		};
	},
);

export type UserSelectedAction = {
	type: 'userSelected';
	payload: {
		userId: UserId;
	};
};

export type UserDeselectedAction = {
	type: 'userDeselected';
};

export type UsersStoredAction = {
	type: 'usersStored';
	payload: {
		users: User[];
	};
};

export type Action =
	| UserSelectedAction
	| UserDeselectedAction
	| UsersStoredAction;

const InitialUsersState: UsersState = {
	entities: {},
	ids: [],
	selectedUserId: undefined,
};

export const usersRedeucer = (
	state = InitialUsersState,
	action: Action,
): UsersState => {
	switch (action.type) {
		case 'usersStored': {
			const { users } = action.payload;
			return {
				...state,
				entities: users.reduce(
					(acc, user) => {
						acc[user.id] = user;
						return acc;
					},
					{} as Record<UserId, User>,
				),
				ids: users.map((user) => user.id),
			};
		}

		case 'userSelected': {
			const { userId } = action.payload;
			return {
				...state,
				selectedUserId: userId,
			};
		}

		case 'userDeselected': {
			return {
				...state,
				selectedUserId: undefined,
			};
		}

		default:
			return state;
	}
};

export const selectSelectedUserId = (state: AppState) =>
	state.users.selectedUserId;

export const selectSortedUsers = createAppSelector(
	[
		(state: AppState) => state.users.ids,
		(state: AppState) => state.users.entities,
		(_: AppState, sort: 'asc' | 'desc') => sort,
	],
	(ids, entities, sort) => {
		return ids
			.map((element) => entities[element])
			.sort((a, b) => {
				if (sort === 'asc') {
					return a.name.localeCompare(b.name);
				} else {
					return b.name.localeCompare(a.name);
				}
			});
	},
);
