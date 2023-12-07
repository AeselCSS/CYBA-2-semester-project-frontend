interface IAuthUser {
	cybaRoles: string[];
	email: string;
	email_verified: boolean;
	name: string;
	nickname: string;
	picture: string;
	sub: string;
	updated_at: string;
}

interface ICustomer {
	id: string;
	role: Role;
	firstName: string;
	lastName: string;
	address: string;
	city: string;
	zip: number;
	phone: number;
	email: string;
	createdAt: Date;
	updatedAt: Date;
}

interface IAPISingleCustomer {
	customer: ICustomer;
	cars: ICar[];
	orders: IOrder[];
}

interface IAPISingleEmployee {
	employee: IEmployee;
}

interface IAPIOrder extends IOrder {
	registrationNumber: string;
}

interface IOrder {
	id: number;
	status: Status;
	orderStartDate: Date;
	carId: number;
	customerId: number;
	createdAt: Date;
	updatedAt: Date;
	registrationNumber: string;
	vinNumber: string;
}

interface ICar {
	id: number;
	customerId: string;
	registrationNumber: string;
	vinNumber: string;
	brand: string;
	model: string;
	modelVariant: string;
	firstRegistration: Date;
	mileage: number;
	lastInspectionDate: Date;
	lastInspectionResult: string;
	lastInspectionKind: string;
	createdAt: Date;
	updatedAt: Date;
}

interface IEmployee {
	id: string;
	role: Role;
	department: Department;
	firstName: string;
	lastName: string;
	createdAt: Date;
	updatedAt: Date;
}

type IMetaData = {
	totalCount: number;
	offset: number;
	limit: number;
};

type APIResponse<T> = {
	data: T[];
	metaData: IMetaData;
};

interface ICurrentOrder {
	id: number;
	status: string;
	totalTime: number;
	orderStartDate: Date;
	createdAt?: Date;
	updatedAt?: Date;
	car: {
		id: number;
		registrationNumber: string;
		vinNumber: string;
		brand: string;
		model: string;
		modelVariant: string;
		mileage: number;
	};
	customer: {
		id: string;
		firstName: string;
		lastName: string;
		email: string;
		phone: number;
	};
	tasks: {
		id: number;
		name: string;
		description: string;
		status: string;
		updatedAt: Date;
		totalTime: number;
		employee: null | number;
		subtasks: {
			id: number;
			name: string;
			description: string;
			time: number;
			status: string;
			updatedAt: Date;
		}[];
	}[];
}

interface ITask {
	id: number;
	name: string;
	description: string;
}

interface IAPITask extends ITask{
	time: number
}

type EntityUnion = ICustomer | IEmployee | ICar | IOrder;

type UserUnion = ICustomer | IEmployee | IAuthUser | null;
