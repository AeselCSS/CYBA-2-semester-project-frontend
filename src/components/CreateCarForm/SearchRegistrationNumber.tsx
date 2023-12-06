import React from 'react';
import { notifications } from '@mantine/notifications';
import { MdErrorOutline } from "react-icons/md";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

interface IAPICar {
	registrationNumber: string,
	vinNumber: string,
	brand: string,
	model: string,
	modelVariant: string,
	firstRegistration: string,
	lastInspectionDate: string,
	lastInspectionResult: string,
	lastInspectionKind: string,
	mileage: string
}


interface Props {
	setAPIResult: (newValue: IAPICar | null) => void;
	setRegistrationNumber: (newValue: string) => void;
	registrationNumber: string;
}

export default function SearchRegistrationNumber({ setAPIResult, setRegistrationNumber, registrationNumber}: Props) {

	const handleAPIGet = async () => {
		const response = await fetch(`http://localhost:3000/cars/registration/${registrationNumber}`, {
			method: 'GET',
		});

		if (response.ok) {
			const carDetails = await response.json();
			setAPIResult(carDetails);
			notifications.show({
				color: 'green',
				title: "Succes!",
				message: "Dine køretøjsoplysninger er hentet succesfuldt",
				icon: <IoIosCheckmarkCircleOutline />
			})
		} else {
			setAPIResult(null);
			notifications.show({
				color: 'red',
				title: "Hov!",
				message: "Vi kunne desværre ikke finde dit køretøj. Har du tastet rigtigt?",
				icon: <MdErrorOutline />
			})
		}
	};

	const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRegistrationNumber(event.target.value);
	};

	return (
		<>
			<label htmlFor='registrationNumber'>Registerings Nr.</label>
			<input value={registrationNumber} onChange={handleInput} id='registrationNumber' placeholder='Registerings nr.' required={true} />

			<div className='form-btn-wrapper' style={{ paddingBottom: '2rem' }}>
				<input style={{cursor: 'pointer'}} type="button" value="Søg efter køretøj..." onClick={handleAPIGet}/>
			</div>
		</>
	);
}