import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import { handleLogout } from '../../services/Auth0Services.ts';

export const LogoutButton: React.FC = () => {
	const { logout } = useAuth0();

	const onLogoutClick = () => {
		handleLogout(logout, {
			logoutParams: {
				returnTo: window.location.origin
			}
		});
	};

	return (
		<button onClick={onLogoutClick}>Log Ud</button>
	);
};
