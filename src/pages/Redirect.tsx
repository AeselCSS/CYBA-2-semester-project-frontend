import { useContext, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/userContext';
import { fetchAndProcessUserData } from '../services/userService.ts';
import Loading from '../components/Loading/Loading.tsx';

export default function Redirect() {
	const { user, isAuthenticated, isLoading, error } = useAuth0();
	const navigate = useNavigate();
	const { setUser } = useContext(UserContext);

	useEffect(() => {
		const processUser = async () => {
			if (!isAuthenticated || !user) {
				console.error('User is not authenticated');
				return;
			}

			if (!isLoading) {
				try {
					await fetchAndProcessUserData(user as IAuthUser, setUser, navigate);
				} catch (error) {
					console.error('Error processing user data:', error);
					// Handle the error appropriately
				}
			}
		};
		processUser().then(() => {
			console.log('User data processed');
		});
	}, [user, isAuthenticated, isLoading, setUser, navigate]);

	if (isLoading) {
		return (
			<Loading />
		);
	}

	if (error) {
		return <p>Error: {error.message}</p>;
	}

	return null;
}
