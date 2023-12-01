import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';

export const SignupButton: React.FC = () => {
	const { loginWithRedirect } = useAuth0();

	const handleSignUp = async () => {
		await loginWithRedirect({
			appState: {
				returnTo: '/profile',
			},
			authorizationParams: {
				prompt: 'login',
				screen_hint: 'signup',
			},
		});
	};

	return (
		<button onClick={handleSignUp}>Opret Bruger</button>
	);
};