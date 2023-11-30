import { useAuth0 } from '@auth0/auth0-react';
import { LoginButton } from '../Buttons/LoginButton';
import { LogoutButton } from '../Buttons/LogoutButton';
import { SignupButton } from '../Buttons/SignupButton';
import './NavBarButtons.css';	

export function NavBarButtons() {
	const { isAuthenticated } = useAuth0();

	return (
		<div className='nav-bar-buttons'>
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
	)
}