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
	const [user, setUser] = useState<ICustomer | IEmployee | IAuthUser | null>(null);

	console.log(user);

	return (
		<Routes>
			<Route path='/' element={<Homepage />} />

			<Route path='/about' element={<About />} />

			<Route path='/contact' element={<Contact />} />

			<Route path='/profile' element={user && <CustomerProfile customer={user as ICustomer} />} />

			<Route path='/orders' element={user && <Orders employee={user as IEmployee} />} />

			<Route path='/createprofile' element={user && <CreateProfile authUser={user as IAuthUser} />} />

			<Route path='/redirect' element={<Redirect setUser={setUser} />} />

			<Route path='*' element={<PageNotFound />} />
		</Routes>
	);
}

export default App;
