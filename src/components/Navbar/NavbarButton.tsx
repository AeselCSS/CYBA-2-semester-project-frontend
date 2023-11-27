import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import { LoginButton } from '../Buttons/LoginButton';
import { LogoutButton } from '../Buttons/LogoutButton';
import { SignupButton } from '../Buttons/SignupButton';

export const NavBarButtons: React.FC = () => {
	const { isAuthenticated } = useAuth0();

	return (
		<div className='nav-bar__buttons'>
			{!isAuthenticated && (
				<>
					<SignupButton />
					<LoginButton />
				</>
			)}
			{isAuthenticated && (
				<>
					<LogoutButton />
				</>
			)}
		</div>
	);
};