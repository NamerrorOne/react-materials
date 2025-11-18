import { createAction, createReducer } from '@reduxjs/toolkit';
import type { AppState } from '../../store';

type CountersState = Record<CounterId, CounterState | undefined>;
type CounterState = {
	counter: number;
};

export type CounterId = string;

const InitialCounterState: CounterState = {
	counter: 0,
};
const InitialCountersState: CountersState = {};

export const incrementAction = createAction<{ counterId: CounterId }>(
	'counters/increment',
);
export const decrementAction = createAction<{ counterId: CounterId }>(
	'counters/decrement',
);

export const countersReducer = createReducer(
	InitialCountersState,
	(builder) => {
		builder.addCase(incrementAction, (state, action) => {
			const { counterId } = action.payload;
			if (!state[counterId]) state[counterId] = { ...InitialCounterState };
			state[counterId]!.counter++;
		});
		builder.addCase(decrementAction, (state, action) => {
			const { counterId } = action.payload;
			if (!state[counterId]) state[counterId] = { ...InitialCounterState };
			state[counterId]!.counter--;
		});
	},
);
export const selectCounter = (state: AppState, counterId: CounterId) => {
	return state.counters[counterId]?.counter ?? 0;
};

// export type IncrementAction = {
// 	type: 'increment';
// 	payload: { counterId: CounterId };
// };
// export type DecrementAction = {
// 	type: 'decrement';
// 	payload: { counterId: CounterId };
// };

// export const countersReducer = (
// 	state = InitialCountersState,
// 	action: Action,
// ): CountersState => {
// 	switch (action.type) {
// 		case 'increment': {
// 			const { counterId } = action.payload;
// 			const currentCounter = state[counterId] ?? InitialCounterState;
// 			return {
// 				...state,
// 				[counterId]: {
// 					...currentCounter,
// 					counter: currentCounter.counter + 1,
// 				},
// 			};
// 		}
// 		case 'decrement': {
// 			const { counterId } = action.payload;
// 			const currentCounter = state[counterId] ?? InitialCounterState;
// 			return {
// 				...state,
// 				[counterId]: {
// 					...currentCounter,
// 					counter: currentCounter.counter - 1,
// 				},
// 			};
// 		}

// 		default:
// 			return state;
// 	}
// };
