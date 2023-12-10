import { useEffect, useState } from 'react';
import formatDate from '../utility/dateFormat.ts';
import { department, role } from '../utility/danishDictionary.ts';
import { getSingleEmployee } from '../services/employeeServices.ts';

interface DetailedEmployeeProps {
	employee: IEmployee;
}

export default function DetailedEmployee({ employee }: DetailedEmployeeProps) {
	const [employeeData, setEmployeeData] = useState<IEmployee | null>(null);

	useEffect(() => {
		getSingleEmployee(employee.id).then((data) => setEmployeeData(data));
	}, [employee.id]);

	return (
		<>
			{employeeData && (
				<div>
					<h2 className='header-one-container'>Oplysninger</h2>

					<section className='modal-container'>
						<div className='modal-grid'>
							<h3>Stilling</h3>
							<div>{role[employeeData?.role]}</div>

							<h3>Afdeling</h3>
							<div>{department[employeeData?.department]}</div>

							<h3>Medarbejder Navn</h3>
							<div>
								{employeeData?.firstName} {employeeData.lastName}
							</div>

							<h3>Seneste Opgave</h3>
							<div>{formatDate(new Date(employeeData.createdAt))}</div>
						</div>
					</section>
				</div>
			)}
		</>
	);
}
