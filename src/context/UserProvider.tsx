import React, { useState, useEffect, ReactNode } from 'react';
import UserContext from './userContext';

interface UserProviderProps {
	children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
	const [user, setUser] = useState<ICustomer | IEmployee | IAuthUser | null>(null);

	// Load user from Local Storage on initial mount
	useEffect(() => {
		const storedUser = localStorage.getItem('userData');
		if (storedUser) {
			setUser(JSON.parse(storedUser));
		}
	}, []);

	return (
		<UserContext.Provider value={{ user, setUser }}>
			{children}
		</UserContext.Provider>
	);
};
