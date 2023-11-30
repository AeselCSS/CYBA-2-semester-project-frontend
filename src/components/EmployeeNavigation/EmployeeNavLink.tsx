import { NavLink } from 'react-router-dom';
import './EmployeeNavLink.css';

interface Props {
	isActive?: boolean,
	title: string,
	redirectTo: string,
}

export default function EmployeeNavLink({isActive = false, title, redirectTo}: Props) {
	const linkClass = isActive ? 'nav-link-active' : 'nav-link';

	return <NavLink className={linkClass} to={redirectTo}>{title}</NavLink>;
}
