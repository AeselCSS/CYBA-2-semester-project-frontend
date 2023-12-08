import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import { handleSignUp } from '../../services/Auth0Services.ts';

export const SignupButton: React.FC = () => {
	const { loginWithRedirect } = useAuth0();

	const onSignUpClick = async () => {
		await handleSignUp(loginWithRedirect);
	}

	return (
		<button onClick={onSignUpClick}>Opret Bruger</button>
	);
};