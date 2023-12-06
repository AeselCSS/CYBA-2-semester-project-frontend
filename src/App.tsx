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
import CustomerProfile from './pages/CustomerProfile.tsx';
import EmployeeOverview from './pages/EmployeeOverview.tsx';
import CustomerOverview from './pages/CustomerOverview.tsx';
import CreateOrder from './pages/CreateOrder.tsx';
import CreateCar from './pages/CreateCar.tsx';
import userContext from './context/userContext.ts';

import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';
import UpdateProfile from './pages/UpdateProfile.tsx';
import Toaster from './components/Toaster/Toaster.tsx';

function App() {
	const [user, setUser] = useState<ICustomer | IEmployee | IAuthUser | null>(null);

	console.log(user);
	console.log('I am in redirect');

	return (

		<userContext.Provider value={user}>
			<MantineProvider>
				<Toaster/>
				<Routes>
					<Route path='/' element={<Homepage />} />
					<Route path='/about' element={<About />} />
					<Route path='/contact' element={<Contact />} />
					<Route path='/orders/create' element={user && <CreateOrder customer={user as ICustomer} />} />
					<Route path='/employee/orders' element={user && <OrderOverview employee={user as IEmployee} />} />
					<Route path='/employee/cars' element={user && <CarOverview employee={user as IEmployee} />} />
					<Route path='/employee/employees' element={user && <EmployeeOverview employee={user as IEmployee} />} />
					<Route path='/employee/customers' element={user && <CustomerOverview employee={user as IEmployee} />} />
					<Route path='/profile' element={user && <CustomerProfile customer={user as ICustomer} />} />
					<Route path='/profile/create' element={user && <CreateProfile authUser={user as IAuthUser} />} />
					<Route path='/profile/update' element={user && <UpdateProfile customer={user as ICustomer} />} />
					<Route path='/cars/create' element={user && <CreateCar customer={user as ICustomer} />} />
					<Route path='/redirect' element={<Redirect setUser={setUser} />} />
					<Route path='*' element={<PageNotFound />} />
				</Routes>
			</MantineProvider>
		</userContext.Provider>

	);
}

export default App;
