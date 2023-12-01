import EmployeeNavLink from './EmployeeNavLink';
import { navigationLinks } from './navigationData';

export default function EmployeeNavigation() {
	return (
		<div className='employee-nav-links-wrapper'>
			{navigationLinks.map(link => (
				<EmployeeNavLink
					key={link.title}
					title={link.title}
					redirectTo={link.redirectTo}
				/>
			))}
		</div>
	);
}