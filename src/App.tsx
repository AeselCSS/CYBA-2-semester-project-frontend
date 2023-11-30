import Homepage from './pages/Homepage';
import { Routes, Route } from 'react-router-dom';
import PageNotFound from './pages/PageNotFound';
import About from './pages/About';
import Contact from './pages/Contact';
import CreateProfile from './pages/CreateProfile';
import { useState } from 'react';
import Redirect from './pages/Redirect';
import OrderOverview from './pages/OrderOverview.tsx';
import CarOverview from './pages/CarOverview.tsx';
import CustomerProfile from './pages/CustomerProfile';
import EmployeeOverview from './pages/EmployeeOverview.tsx';
import CustomerOverview from './pages/CustomerOverview.tsx';


function App() {
	const [user, setUser] = useState<ICustomer | IEmployee | IAuthUser | null>(null);

	console.log(user);


	return (
		<Routes>
			<Route path='/' element={<Homepage />} />

			<Route path='/about' element={<About />} />

			<Route path='/contact' element={<Contact />} />

			<Route path='/orders' element={user && <OrderOverview employee={user as IEmployee} />} />
			<Route path='/cars' element={user && <CarOverview employee={user as IEmployee} />} />
			<Route path='/employees' element={user && <EmployeeOverview employee={user as IEmployee} />} />
			<Route path='/customers' element={user && <CustomerOverview employee={user as IEmployee} />} />
			<Route path='/profile' element={user && <CustomerProfile customer={user as ICustomer} />} />
			<Route path='/createprofile' element={user && <CreateProfile authUser={user as IAuthUser} />} />
			<Route path='/redirect' element={<Redirect setUser={setUser} />} />
			<Route path='*' element={<PageNotFound />} />
		</Routes>
	);
}

export default App;
