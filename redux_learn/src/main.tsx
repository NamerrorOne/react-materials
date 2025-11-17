import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import { createBrowserRouter, NavLink, RouterProvider } from 'react-router-dom';
import PureRedux from './pages/PureRedux.tsx';
import RTKredux from './pages/RTKredux.tsx';
import App from './App.tsx';
import { Provider } from 'react-redux';
import { store } from './store.ts';
import SpisokSelectorsTraining from './pages/SpisokSelectorsTraining.tsx';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App></App>,
		children: [
			{ index: true, element: <PureRedux></PureRedux> },
			{ path: '/rtk', element: <RTKredux></RTKredux> },
			{ path: '*', element: <NavLink to={'/'}>Back to Home</NavLink> },
			{ path: '/list', element: <SpisokSelectorsTraining /> },
		],
	},
]);

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Provider store={store}>
			<RouterProvider router={router}></RouterProvider>
		</Provider>
	</StrictMode>,
);
