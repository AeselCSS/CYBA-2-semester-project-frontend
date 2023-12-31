import React from 'react';
import { notifications } from '@mantine/notifications';
import { getCarDataFromRegistrationNumber } from '../../../services/carServices.ts';
import { NotificationMessageError, NotificationMessageSuccess } from '../../Toaster/NotificationMessage.tsx';

interface Props {
	setAPIResult: (newValue: IAPICar | null) => void;
	setRegistrationNumber: (newValue: string) => void;
	registrationNumber: string;
}

export default function SearchRegistrationNumber({ setAPIResult, setRegistrationNumber, registrationNumber }: Props) {
	const handleAPIGet = async () => {
		const success = await getCarDataFromRegistrationNumber(registrationNumber, setAPIResult);
		if (success) {
			notifications.show(NotificationMessageSuccess({
				title: "Succes!",
				message: "Dine køretøjsoplysninger er hentet succesfuldt",
			}))
		} else {
			notifications.show(NotificationMessageError({
				title: "Hov!",
				message: "Vi kunne desværre ikke finde dit køretøj. Har de tastet rigtigt?",
			}))
		}
	};

	const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRegistrationNumber(event.target.value);
	};

	return (
		<>
			<label htmlFor='registrationNumber'>Registerings Nr.</label>
			<div className='regnr-and-search-wrapper'>
				<input
					value={registrationNumber}
					onChange={handleInput}
					id='registrationNumber'
					placeholder='Registerings nr.'
					required={true}
				/>

				<div style={{ paddingBottom: '2rem' }}>
					<input className='search-car-by-regnr' style={{ cursor: 'pointer' }} type='button' value='Søg' onClick={handleAPIGet} />
				</div>
			</div>
		</>
	);
}