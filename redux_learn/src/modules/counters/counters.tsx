import { useAppDispatch, useAppSelector } from '../../store';
import type { CounterId } from './counters.slice';

export const Counters = () => {
	return (
		<div>
			<Counter counterId="1"></Counter>
			<Counter counterId="2"></Counter>
		</div>
	);
};

export function Counter({ counterId }: { counterId: CounterId }) {
	console.log('component rerender');
	const dispatch = useAppDispatch();
	const counterState = useAppSelector((state) => state.counters[counterId]);

	return (
		<>
			<span style={{ margin: '0 20px' }}></span>
			<button
				onClick={() => dispatch({ type: 'decrement', payload: { counterId } })}
			>
				dec
			</button>
			<span style={{ margin: '0 20px' }}>{counterState?.counter}</span>
			<button
				onClick={() => dispatch({ type: 'increment', payload: { counterId } })}
			>
				inc
			</button>
			<span style={{ margin: '0 20px' }}></span>
		</>
	);
}
