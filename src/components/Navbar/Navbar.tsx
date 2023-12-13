import { NavLink } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { NavBarButtons } from './NavbarButtons';
import NavbarLogo from './NavbarLogo';
import { IoIosArrowDropdown } from 'react-icons/io';
import { defaultNavigationLinks, employeeNavigationLinks } from './/navigationData';
import { CgProfile } from 'react-icons/cg';
import './Navbar.css';

export default function Navbar() {
	const { user } = useAuth0();

	const renderNavLink = (link: { name: string; path: string }) => (
		<li key={link.path}>
			<NavLink to={link.path}>{link.name}</NavLink>
		</li>
	);

	return (
		<>
			<nav>
				<NavbarLogo />
				<div className='nav-links-wrapper'>
					<ul>
						{defaultNavigationLinks.map(renderNavLink)}
						{/* {user && user.cybaRoles[0] === 'customer' && customerNavigationLinks.map(renderNavLink)} */}
						{user && user.cybaRoles[0] === 'customer' && (
							<li>
								<div className='dropdown-wrapper'>
									<NavLink to='/profile'>
										Min Profil
										<CgProfile className='dropdown-icon' />
									</NavLink>
								</div>
							</li>
						)}
						{user && user.cybaRoles[0] === 'employee' && (
							<li>
								<div className='dropdown-wrapper'>
									<a style={{ cursor: 'pointer' }}>
										Oversigt
										<IoIosArrowDropdown className='dropdown-icon' />
									</a>
									<ul className='dropdown'>{employeeNavigationLinks.map(renderNavLink)}</ul>
								</div>
							</li>
						)}
					</ul>
				</div>
				<NavBarButtons />
			</nav>
		</>
	);
}
