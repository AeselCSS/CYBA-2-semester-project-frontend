export function isEmployee(obj: EnitityUnion): obj is IEmployee {
	return typeof obj === 'object' && 'department' in obj;
}

export function isCustomer(obj: EnitityUnion): obj is ICustomer {
	return typeof obj === 'object' && 'city' in obj;
}

export function isOrder(obj: EnitityUnion): obj is IOrder {
	return typeof obj === 'object' && 'orderStartDate' in obj;
}

export function isCar(obj: EnitityUnion): obj is ICar {
	return typeof obj === 'object' && 'brand' in obj;
}
