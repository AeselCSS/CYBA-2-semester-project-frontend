import { NavBarButtons } from './NavbarButtons';
import NavbarLogo from './NavbarLogo';
import { NavLink } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import './Navbar.css';
import { IoIosArrowDropdown } from "react-icons/io";



export default function Navbar() {
	const { user } = useAuth0();

	return (
		<>
			<nav>
				<NavbarLogo />
				<div className='nav-links-wrapper'>
					<ul>
						<li><NavLink to='/'>Forside</NavLink></li>
						<li><NavLink to='/about'>Om os</NavLink></li>
						<li><NavLink to='/contact'>Kontakt</NavLink></li>
						{user && user.cybaRoles[0] === 'customer' && <li><NavLink to='/profile'>Min profil</NavLink></li>}
						{user && user.cybaRoles[0] === 'employee' && (
							<>
								<li>
									<a style={{cursor: "default"}}>
										Oversigt
									<IoIosArrowDropdown color="#e97b05" />
									</a>

									<ul className="dropdown">
										<li><NavLink to='/employee/orders'>Ordre</NavLink></li>
										<li><NavLink to='/employee/cars'>Køretøjer</NavLink></li>
										<li><NavLink to='/employee/customers'>Kunder</NavLink></li>
										<li><NavLink to='/employee/employees'>Ansatte</NavLink></li>
									</ul>
								</li>
							</>
						)}
					</ul>
				</div>
				<NavBarButtons />
			</nav>
		</>
	);
}
