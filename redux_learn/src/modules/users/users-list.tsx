import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import {
	selectSelectedUserId,
	selectSortedUsers,
	type User,
	type UserDeselectedAction,
	type UserId,
	type UserSelectedAction,
} from './users.slice';

const SpisokSelectorsTraining = () => {
	console.log('SpisokSelectorsTraining rerender');
	const [sortType, setSortType] = useState<'asc' | 'desc'>('asc');

	const selectedUserId = useAppSelector(selectSelectedUserId);

	const sortedUsers = useAppSelector((state) =>
		selectSortedUsers(state, sortType),
	);

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
									<UserListItem user={user} key={user.id} />
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

export default SpisokSelectorsTraining;

const SelectedUser = ({ userId }: { userId: UserId }) => {
	const dispatch = useAppDispatch();

	const user = useAppSelector((state) => state.users.entities[userId]);

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
