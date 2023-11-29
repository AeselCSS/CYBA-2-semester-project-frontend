import React from 'react';

const order: { [key: string]: any } = {
	id: 'Order Nr.',
	status: 'Status',
	orderStartDate: 'Start Dato',
	createdAt: 'Oprettelsesdato',
	updatedAt: 'Sidst Opdateret',
	registrationNumber: 'Registrerings Nr.',
	vinNumber: 'STEL-Nr.',
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
};

const car: { [key: string]: any } = {
	registrationNumber: 'Registrerings Nr.',
	vinNumber: 'STEL-Nr.',
	brand: 'Mærke',
	model: 'Model',
	modelVariant: 'Variant',
};

const employee: { [key: string]: any } = {
	role: 'Stilling',
	department: 'Afdeling',
	firstName: 'Fornavn',
	lastName: 'Efternavn',
};

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