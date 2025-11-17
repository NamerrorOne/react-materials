import { useState } from 'react';
import {
	createAppSelector,
	useAppDispatch,
	useAppSelector,
	type AppState,
} from '../store';
import type {
	User,
	UserDeselectedAction,
	UserSelectedAction,
} from '../modules/users/users.slice';

const selectSortedUsers = createAppSelector(
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

const SpisokSelectorsTraining = () => {
	console.log('SpisokSelectorsTraining rerender');
	const [sortType, setSortType] = useState<'asc' | 'desc'>('asc');

	const selectedUser = useAppSelector((state) => {
		return state.users.selectedUserId
			? state.users.entities[state.users.selectedUserId]
			: undefined;
	});

	const sortedUsers = useAppSelector((state) =>
		selectSortedUsers(state, sortType),
	);

	return (
		<div>
			{!selectedUser ? (
				<div>
					<div>
						<button onClick={() => setSortType('asc')}>asc</button>
						<button onClick={() => setSortType('desc')}>desc</button>
					</div>
					<ul>
						{sortedUsers.map((user) => {
							return (
								<>
									<UserListItem user={user} key={user.id} />
								</>
							);
						})}
					</ul>
				</div>
			) : (
				<>
					<SelectedUser user={selectedUser} />
				</>
			)}
		</div>
	);
};

export default SpisokSelectorsTraining;

const SelectedUser = ({ user }: { user: User }) => {
	const dispatch = useAppDispatch();

	const onBackButtonClick = () => {
		dispatch({ type: 'userDeselected' } satisfies UserDeselectedAction);
	};
	return (
		<div>
			<button onClick={onBackButtonClick}>back</button>
			<h2>{user.name}</h2>
			<p>{user.description}</p>
		</div>
	);
};

const UserListItem = ({ user }: { user: User }) => {
	const dispatch = useAppDispatch();
	const handleUserClick = () => {
		dispatch({
			type: 'userSelected',
			payload: { userId: user.id },
		} satisfies UserSelectedAction);
	};
	return (
		<li key={user.id} onClick={handleUserClick}>
			<span>{user.name}</span>
		</li>
	);
};
