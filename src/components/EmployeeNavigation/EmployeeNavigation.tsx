import EmployeeNavLink from './EmployeeNavLink';
import { navigationLinks } from './navigationData';

interface Props {
	currentPath: string;
}

export default function EmployeeNavigation({ currentPath }: Props) {
	return (
		<div>
			{navigationLinks.map(link => (
				<EmployeeNavLink
					key={link.title}
					title={link.title}
					redirectTo={link.redirectTo}
					isActive={currentPath === link.redirectTo}
				/>
			))}
		</div>
	);
}