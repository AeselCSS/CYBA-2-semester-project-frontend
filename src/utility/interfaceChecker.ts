

export function isEmployee(obj: any): obj is IEmployee {
  	return typeof obj === 'object' && 'department' in obj;
}

export function isCustomer(obj: any): obj is ICustomer {
return typeof obj === 'object' && 'city' in obj;
}

export function isOrder(obj: any): obj is IOrder {
return typeof obj === 'object' && 'orderStartDate' in obj;
}

export function isCar(obj: any): obj is ICar {
    return typeof obj === 'object' && 'brand' in obj;
}

