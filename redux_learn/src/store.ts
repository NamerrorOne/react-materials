import { configureStore, createSelector } from '@reduxjs/toolkit';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { countersReducer } from './modules/counters/counters.slice';
import { usersSlice } from './modules/users/users.slice';

export const createAppSelector = createSelector.withTypes<AppState>();

// const reducer = combineReducers({
// 	users: usersRedeucer,
// 	counters: countersReducer,
// });

// const reducer = (state = InitialState, action: Action): State => {
// 	return {
// 		counters: countersReducer(state.counters, action),
// 		users: usersRedeucer(state.users, action),
// 	};
// };

export const store = configureStore({
	reducer: {
		counters: countersReducer,
		[usersSlice.name]: usersSlice.reducer,
	},
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware();
	},
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppStore = useStore.withTypes<typeof store>();
