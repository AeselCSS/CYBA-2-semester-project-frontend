import { createContext } from 'react';

interface UserContextType {
	user: ICustomer | IEmployee | IAuthUser | null;
	setUser: (user: ICustomer | IEmployee | IAuthUser | null) => void;
}

const defaultState = {
	user: null,
	setUser: () => {}, // default empty function
};

const UserContext = createContext<UserContextType>(defaultState);

export default UserContext;