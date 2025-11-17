import { NavLink, Outlet } from 'react-router-dom';

const App = () => {
	return (
		<>
			<nav>
				<NavLink to="/">pure</NavLink>
				<div style={{ width: '20px', display: 'inline-block' }}></div>
				<NavLink to="/rtk">rtk</NavLink>
				<div style={{ width: '20px', display: 'inline-block' }}></div>
				<NavLink to="/list">list traing selector</NavLink>
			</nav>
			<Outlet></Outlet>
		</>
	);
};

export default App;
