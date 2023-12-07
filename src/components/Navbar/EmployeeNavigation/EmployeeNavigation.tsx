import EmployeeNavLink from './EmployeeNavLink.tsx';
import { navigationLinks } from './navigationData.ts';

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