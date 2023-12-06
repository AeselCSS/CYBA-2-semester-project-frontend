// import { Card } from '@mantine/core';
import { useEffect, useState } from 'react';
import formatDate from '../../utility/dateFormat';

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
	console.log(employeeData);

	return (
		<>
			{employeeData && (
				<div>
					<h2 className='header-container'>Oplysninger</h2>

					<section className='modal-container'>
						<div className='modal-grid'>
							<h3>Stilling</h3>
							<div>{employeeData?.role}</div>

							<h3>Afdeling</h3>
							<div>{employeeData?.department}</div>
							<h3>Medarbejder Navn</h3>
							<div>
								{employeeData?.firstName} {employeeData.lastName}
							</div>
							<h3>Seneste Inspektion</h3>
							<div>{formatDate(new Date(employeeData.createdAt))}</div>
						</div>
					</section>
				</div>
			)}
		</>
	);
}
