import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

// enum cyba_roles {
// 	employee = 'employee',
// 	customer = 'customer',
// }

// type TAuth0User = {
// 	cyba_roles: cyba_roles[];
// 	email: string;
// 	email_verified: boolean;
// 	family_name: string;
// 	given_name: string;
// 	locale: string;
// 	name: string;
// 	nickname: string;
// 	picture: string;
// 	sub: string;
// 	updated_at: string;
// };

interface IRedirectProps {
	setCustomer: (user: ICustomer | null) => void;
	setEmployee: (employee: IEmployee | null) => void;
	setAuthUser: (authUser: IAuthUser) => void;
}

export default function Redirect({ setCustomer, setEmployee, setAuthUser }: IRedirectProps) {
	const { user, isLoading, error } = useAuth0();
	const navigate = useNavigate();

	console.log(user);

	useEffect(() => {
		async function getUser() {
			// if (!user) throw new Error('Auth0 user not defined');

			// if (!isAuthenticated) {
			// 	return;
			// }
			if (user) {
				const promise = await fetch(`http://localhost:3000/${user!.cybaRoles}s/${user!.sub}`);

				if (promise.ok) {
					//User eksisterer
					console.log(promise);

					const data = await promise.json();

					if (user.cybaRoles[0] === 'employee') {
						console.log('I AM EMPLOYEE');
						setEmployee(data);
						setCustomer(null);
						navigate('/orders');
					} else {
						setCustomer(data.customer);
						setEmployee(null);
						navigate('/profile');
					}

					//TODO Skal sende til order overview, hvis man er employee
				} else {
					console.log(promise);
					console.log(user);
					
					setAuthUser(user as IAuthUser)
					setEmployee(null);
					setCustomer(null);

					navigate('/createprofile');
					//User eksisterer ikke
				}
			}
		}

		getUser();
	}, [user, navigate, setEmployee, setCustomer, setAuthUser]);

	return <>{isLoading && !error && <p>Loading...</p>}</>;
}

