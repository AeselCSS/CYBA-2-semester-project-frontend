type TObject = IEmployee | ICustomer | IOrder | ICar;

export function isEmployee(obj: TObject): obj is IEmployee {
	return typeof obj === 'object' && 'department' in obj;
}

export function isCustomer(obj: TObject): obj is ICustomer {
	return typeof obj === 'object' && 'city' in obj;
}

export function isOrder(obj: TObject): obj is IOrder {
	return typeof obj === 'object' && 'orderStartDate' in obj;
}

export function isCar(obj: TObject): obj is ICar {
	return typeof obj === 'object' && 'brand' in obj;
}
