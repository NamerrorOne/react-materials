import '../App.css';
import { store, type AppState, type CounterId } from '../store';
import { useEffect, useReducer, useRef } from 'react';

function PureRedux() {
	return (
		<>
			<div>Counter pure redux</div>
			<div className="card">
				<Counter counterId="1"></Counter>
				<Counter counterId="2"></Counter>
				<Counter counterId="3"></Counter>
				<p>
					Edit <code>src/App.tsx</code> and save to test HMR
				</p>
			</div>
			<p className="read-the-docs">
				Click on the Vite and React logos to learn more
			</p>
		</>
	);
}

export default PureRedux;

const selectCounter = (state: AppState, counerId: CounterId) =>
	state.counters[counerId];

export function Counter({ counterId }: { counterId: CounterId }) {
	const lastStateRef = useRef<ReturnType<typeof selectCounter>>(undefined);

	const [, forceUpdate] = useReducer((x) => x + 1, 0);

	useEffect(() => {
		const unsubscribe = store.subscribe(() => {
			const currentState = selectCounter(store.getState(), counterId);
			const lastState = lastStateRef.current;

			if (currentState !== lastState) {
				forceUpdate();
			}
			lastStateRef.current = currentState;
		});
		return unsubscribe;
	}, []);

	const counterState = selectCounter(store.getState(), counterId);

	return (
		<>
			<button
				onClick={() =>
					store.dispatch({ type: 'decrement', payload: { counterId } })
				}
			>
				dec
			</button>
			<span style={{ margin: '0 20px' }}>{counterState?.counter}</span>
			<button
				onClick={() =>
					store.dispatch({ type: 'increment', payload: { counterId } })
				}
			>
				inc
			</button>
		</>
	);
}
