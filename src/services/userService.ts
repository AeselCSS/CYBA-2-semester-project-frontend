import { API_URL } from './config.ts';

const saveUserToLocaleStorage = (userData: UserUnion) => {
	localStorage.setItem('userData', JSON.stringify(userData));
};

export const fetchAndProcessUserData = async (
	user: IAuthUser,
	setUser: (user: UserUnion) => void,
	navigate: (path: string) => void,
	) => {

	try {
		console.log('fetchAndProcessUserData');
		
		const res = await fetch(`${API_URL}/${user.cybaRoles}s/${user.sub}`);
		console.log(`${API_URL}/${user.cybaRoles}s/${user.sub}`);
		console.log(res);
		

		if (res.ok) {
			const data = await res.json();
			console.log('data', data);

			if (user.cybaRoles[0] === 'employee') {
				saveUserToLocaleStorage(data as IEmployee);
				setUser(data as IEmployee);
				navigate('/employee/orders');
			}

			if (user.cybaRoles[0] === 'customer') {
				saveUserToLocaleStorage(data.customer as ICustomer);
				setUser(data.customer as ICustomer);
				navigate('/profile');
			}
		} else if (res.status === 404 && user.cybaRoles[0] === 'customer') {
			setUser(user as IAuthUser);
			navigate('/profile/create');
		}
	} catch (error) {
		console.error('Error fetching user data:', error);
	}
};
