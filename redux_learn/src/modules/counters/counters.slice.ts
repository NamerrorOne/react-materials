import type { AppState } from '../../store';

export type IncrementAction = {
	type: 'increment';
	payload: { counterId: CounterId };
};
export type DecrementAction = {
	type: 'decrement';
	payload: { counterId: CounterId };
};

type CounterState = {
	counter: number;
};

export type CounterId = string;

type CountersState = Record<CounterId, CounterState | undefined>;

export type Action = IncrementAction | DecrementAction;

const InitialCounterState: CounterState = {
	counter: 0,
};

const InitialCountersState: CountersState = {};

export const countersReducer = (
	state = InitialCountersState,
	action: Action,
): CountersState => {
	switch (action.type) {
		case 'increment': {
			const { counterId } = action.payload;
			const currentCounter = state[counterId] ?? InitialCounterState;
			return {
				...state,
				[counterId]: {
					...currentCounter,
					counter: currentCounter.counter + 1,
				},
			};
		}
		case 'decrement': {
			const { counterId } = action.payload;
			const currentCounter = state[counterId] ?? InitialCounterState;
			return {
				...state,
				[counterId]: {
					...currentCounter,
					counter: currentCounter.counter - 1,
				},
			};
		}

		default:
			return state;
	}
};

export const selectCounter = (state: AppState, counterId: CounterId) => {
	return state.counters[counterId]?.counter ?? 0;
};
