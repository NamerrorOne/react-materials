import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { usersSlice, type UserId } from './users.slice';
import { fetchUsers } from './model/fetch-users';

const UsersList = () => {
	const [sortType, setSortType] = useState<'asc' | 'desc'>('asc');
	const dispatch = useAppDispatch();

	const isPending = useAppSelector(
		usersSlice.selectors.selectIsFetchUsersPending,
	);

	useEffect(() => {
		dispatch(fetchUsers);
	}, [dispatch]);

	const sortedUsers = useAppSelector((state) =>
		usersSlice.selectors.selectSortedUsers(state, sortType),
	);

	const selectedUserId = useAppSelector(
		usersSlice.selectors.selectSelectedUserId,
	);

	if (isPending) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			{!selectedUserId ? (
				<div>
					<div>
						<button onClick={() => setSortType('asc')}>asc</button>
						<button onClick={() => setSortType('desc')}>desc</button>
					</div>
					<ul>
						{sortedUsers.map((user) => {
							return (
								<>
									<UserListItem userId={user.id} key={user.id} />
								</>
							);
						})}
					</ul>
				</div>
			) : (
				<>
					<SelectedUser userId={selectedUserId} />
				</>
			)}
		</div>
	);
};

export default UsersList;

const SelectedUser = ({ userId }: { userId: UserId }) => {
	const dispatch = useAppDispatch();

	const user = useAppSelector((state) => state.users.entities[userId]);

	const onBackButtonClick = () => {
		dispatch(usersSlice.actions.deselected());
	};
	return (
		<div>
			<button onClick={onBackButtonClick}>back</button>
			<h2>{user.name}</h2>
			<p>{user.description}</p>
		</div>
	);
};

const UserListItem = ({ userId }: { userId: UserId }) => {
	const dispatch = useAppDispatch();
	const handleUserClick = () => {
		dispatch(usersSlice.actions.selected({ userId }));
	};
	return (
		<li key={userId} onClick={handleUserClick}>
			<span>user: {userId}</span>
		</li>
	);
};
