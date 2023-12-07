import { useContext, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/userContext';

export default function Redirect() {
	const { user, isAuthenticated, isLoading, error } = useAuth0();
	const navigate = useNavigate();
	const { setUser } = useContext(UserContext);

	const saveUserToLocaleStorage = (userData: UserUnion) => {
		localStorage.setItem('userData', JSON.stringify(userData));
	};

	useEffect(() => {
		async function getUser() {
			if (!isAuthenticated || !user) {
				// Handle the case when the user is not authenticated
				return;
			}

			try {
				const res = await fetch(`http://localhost:3000/${user.cybaRoles}s/${user.sub}`);

				if (res.ok) {
					const data = await res.json();

					if (user.cybaRoles[0] === 'employee') {
						saveUserToLocaleStorage(data as IEmployee)
						setUser(data as IEmployee);
						navigate('/employee/orders');
					}

					if (user.cybaRoles[0] === 'customer') {
						saveUserToLocaleStorage(data.customer as ICustomer)
						setUser(data.customer as ICustomer);
						navigate('/profile');
					}

					if (!user.cybaRoles) {
					setUser(user as IAuthUser);
					navigate('/profile/create');
					}
				}
			} catch (error) {
				console.error('Error fetching user data:', error);
				// Handle the error appropriately
			}
		}

		if (!isLoading) {
			getUser();
		}
	}, [user, isAuthenticated, isLoading, setUser, navigate]);

	if (isLoading) {
		return <p>Loading...</p>;
	}

	if (error) {
		return <p>Error: {error.message}</p>;
	}

	return null;
}
