import Homepage from './pages/Homepage';
import { Routes, Route } from 'react-router-dom';
import PageNotFound from './pages/PageNotFound';
import About from './pages/About';
import Contact from './pages/Contact';
import CustomerProfile from './pages/CustomerProfile';
import { useState } from 'react';
import Redirect from './pages/Redirect';

function App() {
	const [user, setUser] = useState<IAPISingleCustomer | null>(null);

	return (
		<Routes>
			<Route path='/' element={<Homepage />} />
			<Route path='/about' element={<About />} />
			<Route path='/contact' element={<Contact />} />
			<Route path='/profile' element={user ? <CustomerProfile user={user} /> : <PageNotFound />} />
			<Route path='/redirect' element={<Redirect setUser={setUser} />} />
			<Route path='*' element={<PageNotFound />} />
		</Routes>
	);
}

export default App;
