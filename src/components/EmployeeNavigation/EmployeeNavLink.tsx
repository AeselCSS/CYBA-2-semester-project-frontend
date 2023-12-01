import { NavLink } from 'react-router-dom';
import './EmployeeView.css';

interface Props {
	isActive?: boolean,
	title: string,
	redirectTo: string,
}

export default function EmployeeNavLink({title, redirectTo}: Props) {

	return <NavLink className='nav-link' to={redirectTo}>{title}</NavLink>;
}
