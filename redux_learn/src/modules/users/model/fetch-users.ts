import { api } from '../../../shared/api';
import { type AppDispatch, type AppState } from '../../../store';
import { usersSlice } from '../users.slice';

export const fetchUsers = (dispatch: AppDispatch, getState: () => AppState) => {
	const isIdle = usersSlice.selectors.selectIsFetchUsersIdle(getState());
	if (!isIdle) {
		return;
	}
	dispatch(usersSlice.actions.fetchUsersPending());
	api
		.getUsers()
		.then((data) => {
			dispatch(usersSlice.actions.fetchUsersSuccess({ users: data }));
		})
		.catch((e) => {
			console.log(e);
			dispatch(usersSlice.actions.fetchUsersFailed());
		});
};
