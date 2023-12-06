export function isEmployee(obj: EntityUnion): obj is IEmployee {
	return typeof obj === 'object' && 'department' in obj;
}

export function isCustomer(obj: EntityUnion): obj is ICustomer {
	return typeof obj === 'object' && 'city' in obj;
}

export function isOrder(obj: EntityUnion): obj is IOrder {
	return typeof obj === 'object' && 'orderStartDate' in obj;
}

export function isCar(obj: EntityUnion): obj is ICar {
	return typeof obj === 'object' && 'brand' in obj;
}
