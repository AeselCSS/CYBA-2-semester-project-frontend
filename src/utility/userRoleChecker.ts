import { Role } from './enums.ts';

type UserUnion = ICustomer | IEmployee | IAuthUser | null;

export const userIsEmployee = (user: UserUnion) => {
	return user && 'role' in user && user.role === Role.EMPLOYEE;
};

export const userIsCustomer = (user: UserUnion) => {
	return user && 'role' in user && user.role === Role.CUSTOMER;
}

export const userIsAuthUser = (user: UserUnion) => {
	return user && 'cybaRoles' in user && 'sub' in user;
}