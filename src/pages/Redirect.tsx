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
	// setCustomer: (user: ICustomer | null) => void;
	// setEmployee: (employee: IEmployee | null) => void;
	// setAuthUser: (authUser: IAuthUser) => void;
	setUser: (user: ICustomer | IEmployee | IAuthUser | null) => void;
}

export default function Redirect({ setUser }: IRedirectProps) {
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
				const res = await fetch(`http://localhost:3000/${user!.cybaRoles}s/${user!.sub}`);

				if (res.ok) {
					//User eksisterer
					console.log(res);

					const data = await res.json();

					if (user.cybaRoles[0] === 'employee') {
						console.log('I AM EMPLOYEE');

						setUser(data as IEmployee);
						navigate('/orders');
					} else {
						setUser(data.customer as ICustomer);

						navigate('/profile');
					}

					//TODO Skal sende til order overview, hvis man er employee
				} else {
					console.log(res);
					console.log(user);

					setUser(user as IAuthUser);

					navigate('/createprofile');
					//User eksisterer ikke
				}
			}
		}

		getUser();
	}, [user, setUser, navigate]);

	return <>{isLoading && !error && <p>Loading...</p>}</>;
}
