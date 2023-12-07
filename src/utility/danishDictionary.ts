export const status: { [key: string]: string } = {
	AWAITING_CUSTOMER: 'Afventer kunde',
	PENDING: 'Afventer værksted',
	IN_PROGRESS: 'Igangsat',
	COMPLETED: 'Fuldført',
};

export const department: { [key: string]: string } = {
	ADMINISTRATION: 'Administration',
	BODY_WORKSHOP: 'Pladeværksted',
	MECHANICAL_WORKSHOP: 'Mekanisk værksted',
	PAINT_SHOP: 'Malerværksted',
};

export const filterDictionary: { [key: string]: object } = {
	order: status,
	employee: department,
};

export const order: { [key: string]: string } = {
	id: 'Order nr.',
	customerId: 'Kunde ID',
	status: 'Status',
	orderStartDate: 'Start Dato',
	registrationNumber: 'Registrerings nr.',
	vinNumber: 'STEL-nr.',
	createdAt: 'Oprettelsesdato',
	updatedAt: 'Sidst Opdateret',
};

export const customer: { [key: string]: string } = {
	id: 'Kunde ID',
	firstName: 'Fornavn',
	lastName: 'Efternavn',
	address: 'Adresse',
	city: 'By',
	zip: 'Post nr.',
	phone: 'Tlf. nr.',
	email: 'E-mail',
	role: 'Type',
	createdAt: 'Oprettelsesdato',
	updatedAt: 'Sidst Opdateret',
};

export const car: { [key: string]: string } = {
	id: 'ID',
	customerId: 'Kunde ID',
	registrationNumber: 'Registrerings nr.',
	vinNumber: 'STEL-nr.',
	brand: 'Mærke',
	model: 'Model',
	modelVariant: 'Variant',
	mileage: 'K/m kørt',
	lastInspectionDate: 'Sidste inspektionsdato',
	firstRegistration: 'Først registreret',
	lastInspectionResult: 'Sidste inspektionsresultat',
	lastInspectionKind: 'Sidste inspektionstype',
	createdAt: 'Oprettelsesdato',
	updatedAt: 'Sidst Opdateret',
};

export const employee: { [key: string]: string } = {
	id: 'ID',
	role: 'Rolle',
	department: 'Afdeling',
	firstName: 'Fornavn',
	lastName: 'Efternavn',
	createdAt: 'Oprettelsesdato',
	updatedAt: 'Sidst Opdateret',
};

export const role: { [key: string]: string } = {
	EMPLOYEE: 'Medarbejder',
	ADMIN: 'Administrator',
	CUSTOMER: 'Kunde',
};
