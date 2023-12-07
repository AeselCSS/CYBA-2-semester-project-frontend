import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';

export const LogoutButton: React.FC = () => {
	const { logout } = useAuth0();

	const handleLogout = () => {
			// remove userData from localStorage
			localStorage.removeItem('userData');

		logout({
			logoutParams: {
				returnTo: window.location.origin,
			},
		})
	};

	return (
		<button onClick={handleLogout}>Log Ud</button>
	);
};
