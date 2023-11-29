import React from 'react';


//TODO Burde smides i en seperat mappe. Kommer 100p til at genbruges senere
const order: { [key: string]: any } = {
	id: 'Order Nr.',
	status: 'Status',
	orderStartDate: 'Start Dato',
	registrationNumber: 'Registrerings Nr.',
	vinNumber: 'STEL-Nr.',
	createdAt: 'Oprettelsesdato',
	updatedAt: 'Sidst Opdateret',
};

const customer: { [key: string]: any } = {
	firstName: 'Fornavn',
	lastName: 'Efternavn',
	address: 'Adresse',
	city: 'By',
	zip: 'Post Nr.',
	phone: 'Tlf. Nr.',
	email: 'E-mail',
	createdAt: 'Oprettelsesdato',
	updatedAt: 'Sidst Opdateret'
};

const car: { [key: string]: any } = {
	registrationNumber: 'Registrerings Nr.',
	vinNumber: 'STEL-Nr.',
	brand: 'Mærke',
	model: 'Model',
	modelVariant: 'Variant',
	createdAt: 'Oprettelsesdato',
	updatedAt: 'Sidst Opdateret'
};

const employee: { [key: string]: any } = {
	role: 'Stilling',
	department: 'Afdeling',
	firstName: 'Fornavn',
	lastName: 'Efternavn',
	createdAt: 'Oprettelsesdato',
	updatedAt: 'Sidst Opdateret'
};
//TODO slut.

interface Props {
	title: string;
	handleSort: (e: React.MouseEvent<HTMLElement>) => void;
	/*itemType: { [key: string]: any };*/
	itemType: string;
}

export default function TableHeaderColumn({ title, handleSort, itemType }: Props) {

	if (itemType === 'order') {
		return (
			<th id={title} onClick={handleSort}>
				{order[title]}
			</th>
		);
	} else if (itemType === 'customer') {
		return (
			<th id={title} onClick={handleSort}>
				{customer[title]}
			</th>
		);
	} else if (itemType === 'car') {
		return (
			<th id={title} onClick={handleSort}>
				{car[title]}
			</th>
		);
	} else if (itemType === 'employee') {
		return (
			<th id={title} onClick={handleSort}>
				{employee[title]}
			</th>
		);
	}

	return null;
}