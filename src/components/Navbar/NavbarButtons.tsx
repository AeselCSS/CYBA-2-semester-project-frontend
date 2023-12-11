import { useAuth0 } from '@auth0/auth0-react';
import { LoginButton } from '../Buttons/LoginButton';
import { LogoutButton } from '../Buttons/LogoutButton';
import { SignupButton } from '../Buttons/SignupButton';
import './NavBarButtons.css';
import { useContext } from 'react';
import UserContext from '../../context/userContext';

export function NavBarButtons() {
	const { isAuthenticated } = useAuth0();
	const { user } = useContext(UserContext);

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
					<div>Hej {((user as ICustomer) || (user as IEmployee)).firstName}</div>
					<LogoutButton />
				</>
			)}
		</div>
	);
}
