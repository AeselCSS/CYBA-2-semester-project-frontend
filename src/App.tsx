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
	const [customer, setCustomer] = useState<ICustomer | null>(null);
	const [employee, setEmployee] = useState<IEmployee | null>(null);


	return (
		<Routes>
			<Route path='/' element={<Homepage />} />
			<Route path='/about' element={<About />} />
			<Route path='/contact' element={<Contact />} />
			<Route path='/profile' element={customer && <CustomerProfile customer={customer} />} />
			<Route path='/orders' element={employee && <OrderOverview employee={employee} />} />
			<Route path='/cars' element={employee && <CarOverview employee={employee} />} />
			<Route path='/employees' element={employee && <EmployeeOverview employee={employee} />} />
			<Route path='/customers' element={employee && <CustomerOverview employee={employee} />} />
			<Route path='/createprofile' element={<CreateProfile />} />
			<Route path='/redirect' element={<Redirect setEmployee={setEmployee} setCustomer={setCustomer} />} />
			<Route path='*' element={<PageNotFound />} />
		</Routes>
	);
}

export default App;
