import Homepage from './pages/Homepage';
import { Routes, Route } from 'react-router-dom';
import PageNotFound from './pages/PageNotFound';
import About from './pages/About';
import Contact from './pages/Contact';
import CreateProfile from './pages/CreateProfile';
import { useState } from 'react';
import Redirect from './pages/Redirect';
import Orders from './pages/Orders';
import CustomerProfile from './pages/CustomerProfile';

function App() {
	const [customer, setCustomer] = useState<ICustomer | null>(null);
	const [employee, setEmployee] = useState<IEmployee | null>(null);

	return (
		<Routes>
			<Route path='/' element={<Homepage />} />
			<Route path='/about' element={<About />} />
			<Route path='/contact' element={<Contact />} />
			<Route path='/profile' element={customer && <CustomerProfile customer={customer} />} />
			<Route path='/orders' element={employee && <Orders employee={employee} />} />

			<Route path='/createprofile' element={<CreateProfile />} />
			<Route path='/redirect' element={<Redirect setEmployee={setEmployee} setCustomer={setCustomer} />} />
			<Route path='*' element={<PageNotFound />} />
		</Routes>
	);
}

export default App;
