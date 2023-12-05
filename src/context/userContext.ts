import { createContext } from 'react';

const userContext = createContext<ICustomer | IEmployee | IAuthUser | null>(null);

export default userContext;
