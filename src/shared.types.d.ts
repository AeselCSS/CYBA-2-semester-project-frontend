

interface ICustomer {
    id: string,
    role: Role,
    firstName: string,
    lastName: string,
    address: string,
    city: string,
    zip: number,
    phone: number,
    email: string,
    createdAt?: Date,
    updatedAt?: Date
}

interface IAPISingleCustomer {
	customer: ICustomer;
	cars: ICar[];
	orders: IOrder[];
}

interface IAPISingleEmployee {
    employee: IEmployee
}

interface IOrder {
    id: number,
    status: Status,
    orderStartDate: Date,
    carId: number,
    customerId: number,
    createdAt?: Date,
    updatedAt?: Date
}

interface ICar {
    id: number, 
    customerId: number,
    registrationNumber: string,
    vinNumber: number,
    brand: string,
    model: string,
    modelVariant: string,
    firstRegistration: Date,
    mileage: number,
    lastInspectionDate: Date,
    lastInspectionResult: string,
    lastInspectionKind: string,
    createdAt?: Date,
    updatedAt?: Date
}

interface IEmployee {
    id: string,
    role: Role,
    department: Department,
    firstName: string,
    lastName: string,
    createdAt?: Date,
    updatedAt?: Date
}


enum Status {
    AWAITING_CUSTOMER,
    PENDING,
    IN_PROGRESS,
    COMPLETED,
    CANCELED
}

enum Department {
    MECHANICAL_WORKSHOP,
    BODY_WORKSHOP,
    PAINT_SHOP,
    ADMINISTRATION
}

enum Role {
    CUSTOMER,
    EMPLOYEE,
    ADMIN
}