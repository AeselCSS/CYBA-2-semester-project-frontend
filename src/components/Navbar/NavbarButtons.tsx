import { useAuth0 } from '@auth0/auth0-react';
import { LoginButton } from '../Buttons/LoginButton';
import { LogoutButton } from '../Buttons/LogoutButton';
import { SignupButton } from '../Buttons/SignupButton';
import './NavBarButtons.css';
import { useContext } from 'react';
import UserContext from '../../context/userContext';

export function NavBarButtons() {
	const { user: authUser, isAuthenticated } = useAuth0();
	const { user: contextUser } = useContext(UserContext);

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
					<div className='nav-user-info'>
						Hej {((contextUser as IEmployee) || (contextUser as IEmployee)).firstName || ''}
						<img src={(authUser as IAuthUser).picture} alt='' />
					</div>
					<LogoutButton />
				</>
			)}
		</div>
	);
}
