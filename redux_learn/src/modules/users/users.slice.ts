import {
	createSelector,
	createSlice,
	type PayloadAction,
} from '@reduxjs/toolkit';

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
	fetchUsersStatus: 'idle' | 'pending' | 'success' | 'failed';
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

const InitialUsersState: UsersState = {
	entities: {},
	ids: [],
	selectedUserId: undefined,
	fetchUsersStatus: 'idle',
};

export const usersSlice = createSlice({
	name: 'users',
	initialState: InitialUsersState,
	selectors: {
		selectSelectedUserId: (state) => state.selectedUserId,
		selectSortedUsers: createSelector(
			(state: UsersState) => state.ids,
			(state: UsersState) => state.entities,
			(_: UsersState, sort: 'asc' | 'desc') => sort,
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
		),
		selectIsFetchUsersPending: (state) => state.fetchUsersStatus === 'pending',
		selectIsFetchUsersIdle: (state) => state.fetchUsersStatus === 'idle',
	},
	reducers: {
		selected: (state, action: PayloadAction<{ userId: UserId }>) => {
			state.selectedUserId = action.payload.userId;
		},

		fetchUsersPending: (state) => {
			state.fetchUsersStatus = 'pending';
		},

		fetchUsersSuccess: (state, action: PayloadAction<{ users: User[] }>) => {
			state.fetchUsersStatus = 'success';
			const { users } = action.payload;
			state.entities = users.reduce(
				(acc, user) => {
					acc[user.id] = user;
					return acc;
				},
				{} as Record<UserId, User>,
			);
			state.ids = users.map((user) => user.id);
		},

		fetchUsersFailed: (state) => {
			state.fetchUsersStatus = 'failed';
		},

		deselected: (state) => {
			state.selectedUserId = undefined;
		},
	},
});

// export const selectSelectedUserId = (state: AppState) =>
// 	state.users.selectedUserId;
// export const usersRedeucer = (
// 	state = InitialUsersState,
// 	action: Action,
// ): UsersState => {
// 	switch (action.type) {
// 		case 'usersStored': {
// 			const { users } = action.payload;
// 			return {
// 				...state,
// 				entities: users.reduce(
// 					(acc, user) => {
// 						acc[user.id] = user;
// 						return acc;
// 					},
// 					{} as Record<UserId, User>,
// 				),
// 				ids: users.map((user) => user.id),
// 			};
// 		}

// 		case 'userSelected': {
// 			const { userId } = action.payload;
// 			return {
// 				...state,
// 				selectedUserId: userId,
// 			};
// 		}

// 		case 'userDeselected': {
// 			return {
// 				...state,
// 				selectedUserId: undefined,
// 			};
// 		}

// 		default:
// 			return state;
// 	}
// };
