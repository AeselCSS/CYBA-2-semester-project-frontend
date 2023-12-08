import { Route, Routes } from 'react-router-dom';
import {
	Homepage,
	PageNotFound,
	About,
	Contact,
	CreateProfile,
	Redirect,
	OrderOverview,
	CarOverview,
	CustomerProfile,
	EmployeeOverview,
	CustomerOverview,
	CreateOrder,
	CreateCar,
	UpdateProfile,
} from '../pages';

export function AppRoutes() {
	return (
		<Routes>
			<Route path='/' element={<Homepage />} />
			<Route path='/about' element={<About />} />
			<Route path='/contact' element={<Contact />} />
			<Route path='/redirect' element={<Redirect />} />

			{/* Protected Routes */}
			<Route path='/profile' element={<CustomerProfile />} />
			<Route path='/profile/create' element={<CreateProfile />} />
			<Route path='/profile/update' element={<UpdateProfile />} />
			<Route path='/orders/create' element={<CreateOrder />} />
			<Route path='/cars/create' element={<CreateCar />} />
			<Route path='/employee/orders' element={<OrderOverview />} />
			<Route path='/employee/cars' element={<CarOverview />} />
			<Route path='/employee/employees' element={<EmployeeOverview />} />
			<Route path='/employee/customers' element={<CustomerOverview />} />

			{/* Catch-all Route */}
			<Route path='*' element={<PageNotFound />} />
		</Routes>
	);
}