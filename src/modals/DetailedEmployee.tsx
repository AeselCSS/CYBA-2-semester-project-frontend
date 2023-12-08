// import { Card } from '@mantine/core';
import { useEffect, useState } from 'react';
import formatDate from '../utility/dateFormat.ts';
import { department, role } from '../utility/danishDictionary.ts';

interface DetailedEmployeeProps {
	employee: IEmployee;
}

export default function DetailedEmployee({ employee }: DetailedEmployeeProps) {
	const [employeeData, setEmployeeData] = useState<IEmployee | null>(null);

	useEffect(() => {
		async function getEmployee() {
			//TODO Tilføj ENV fil til fetch kaldet
			const response = await fetch(`http://localhost:3000/employees/${employee.id}`);
			const data = await response.json();
			setEmployeeData(data);
		}
		getEmployee();
	}, [employee.id]);

	return (
		<>
			{employeeData && (
				<div>
					<h2 className='header-container'>Oplysninger</h2>

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
