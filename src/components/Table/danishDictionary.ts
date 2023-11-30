

export const filterDictionary:{ [key: string]: object }  = {
	order: {
		AWAITING_CUSTOMER: 'Afventer kunde',
		PENDING: 'Afventer værksted',
		IN_PROGRESS: 'Igangsat',
		COMPLETED: "Fuldført"
	},
	employee: {
		ADMINISTRATION: "Administration",
		BODY_WORKSHOP: "Body Workshop",
		MECHANICAL_WORKSHOP: "Værkstedet",
		PAINT_SHOP: "Paint Shop"
	},
};

export const order: { [key: string]: string } = {
	id: 'Order Nr.',
	status: 'Status',
	orderStartDate: 'Start Dato',
	registrationNumber: 'Registrerings Nr.',
	vinNumber: 'STEL-Nr.',
	createdAt: 'Oprettelsesdato',
	updatedAt: 'Sidst Opdateret',
};

export const customer: { [key: string]: string } = {
	firstName: 'Fornavn',
	lastName: 'Efternavn',
	address: 'Adresse',
	city: 'By',
	zip: 'Post Nr.',
	phone: 'Tlf. Nr.',
	email: 'E-mail',
	createdAt: 'Oprettelsesdato',
	updatedAt: 'Sidst Opdateret',
};

export const car: { [key: string]: string } = {
	registrationNumber: 'Registrerings Nr.',
	vinNumber: 'STEL-Nr.',
	brand: 'Mærke',
	model: 'Model',
	modelVariant: 'Variant',
	createdAt: 'Oprettelsesdato',
	updatedAt: 'Sidst Opdateret',
};

export const employee: { [key: string]: string } = {
	role: 'Stilling',
	department: 'Afdeling',
	firstName: 'Fornavn',
	lastName: 'Efternavn',
	createdAt: 'Oprettelsesdato',
	updatedAt: 'Sidst Opdateret',
};