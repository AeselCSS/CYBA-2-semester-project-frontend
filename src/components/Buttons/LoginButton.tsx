import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import { handleLogin } from '../../services/Auth0Services.ts';

export const LoginButton: React.FC = () => {
	console.log('LoginButton');
	const { loginWithRedirect } = useAuth0();

	const onLoginClick = async () => {
		await handleLogin(loginWithRedirect);
	}

	return (
		<button onClick={onLoginClick}>Log Ind</button>
	);
};