import { NavBarButtons } from './NavbarButton';
import NavbarLogo from './NavbarLogo';
import { NavLink } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

export default function Navbar() {
	const { user } = useAuth0();

	return (
		<>
			<nav>
				<NavbarLogo />
				<NavLink to='/'>Home</NavLink>

				<NavLink to='/about'>Abous Us</NavLink>

				<NavLink to='/contact'>Contact</NavLink>

				{user && user.cybaRoles[0] === 'customer' && <NavLink to='/profile'>My profile</NavLink>}

				<NavBarButtons />
			</nav>
		</>
	);
}
