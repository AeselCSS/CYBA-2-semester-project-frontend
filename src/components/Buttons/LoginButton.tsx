import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';

export const LoginButton: React.FC = () => {
	const { loginWithRedirect } = useAuth0();

	const handleLogin = async () => {
		await loginWithRedirect({
			appState: {
				returnTo: '/redirect',
			},
			authorizationParams: {
				prompt: 'login',
			},
		});
	};

	return (
		<button onClick={handleLogin}>Log Ind</button>
	);
};