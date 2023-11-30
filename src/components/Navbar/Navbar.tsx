import { NavBarButtons } from './NavbarButtons';
import NavbarLogo from './NavbarLogo';
import { NavLink } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import './Navbar.css';

export default function Navbar() {
	const { user } = useAuth0();

	return (
		<>
			<nav>
				<NavbarLogo />
				<div className='nav-links-wrapper'>
					<NavLink to='/'>Forside</NavLink>
					<NavLink to='/about'>Om os</NavLink>
					<NavLink to='/contact'>Kontakt</NavLink>
					{user && user.cybaRoles[0] === 'customer' && <NavLink to='/profile'>Min profil</NavLink>}

				</div>
				<NavBarButtons />
			</nav>
		</>
	);
}
