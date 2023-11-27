import Homepage from './pages/Homepage';
import { Routes, Route } from 'react-router-dom';
import PageNotFound from './pages/PageNotFound';
import About from './pages/About';
import Contact from './pages/Contact';
import CustomerProfile from './pages/CustomerProfile';


function App() {
	return (
		<Routes>
			<Route path='/' element={<Homepage />} />
			<Route path='/about' element={<About />} />
			<Route path='/contact' element={<Contact />} />
			<Route path='/profile' element={ <CustomerProfile />} />
			<Route path='*' element={<PageNotFound />} />
		</Routes>
	);
}

export default App;
