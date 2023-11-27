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
	setUser: (user: IAPISingleCustomer) => void;
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
				const promise = await fetch(`http://localhost:3000/${user!['cyba_roles']}s/${user!.sub}`);

				if (promise.ok) {
					//User eksisterer

					console.log(promise);

					const data = await promise.json();
					console.log(data);
					setUser(data);
					navigate('/profile');

					//TODO Skal sende til order overview, hvis man er employee
				} else {
					console.log(promise);

					//User eksisterer ikke
				}
			}
		}

		getUser();
	}, [user, setUser, navigate]);

	return <>{isLoading && !error && <p>Loading...</p>}</>;
}

// // chatgpt forslag
// import { useEffect } from 'react';
// import { useAuth0 } from '@auth0/auth0-react';
// import { useHistory } from 'react-router-dom'; // Import useHistory if you're using React Router

// export default function Redirect({ setUser }: IRedirectProps) {
//     const { user, isAuthenticated, isLoading, error } = useAuth0();
//     const history = useHistory(); // Initialize useHistory

//     useEffect(() => {
//         async function getUser() {
//             if (!user) {
//                 console.error('Auth0 user not defined');
//                 return;
//             }

//             try {
//                 const response = await fetch(`http://localhost:3000/${user['cyba_roles']}/${user.sub}`);
//                 if (response.ok) {
//                     const data = await response.json();
//                     setUser(data);

//                     // Redirect based on role
//                     if (data.cyba_roles.includes('employee')) {
//                         history.push('/employee-dashboard');
//                     } else if (data.cyba_roles.includes('customer')) {
//                         history.push('/customer-dashboard');
//                     }
//                 } else {
//                     // Handle user not existing in database
//                     console.error('User not found in database');
//                     // Redirect to sign-up page or show a message
//                 }
//             } catch (error) {
//                 console.error('Error fetching user data:', error);
//             }
//         }

//         if (isAuthenticated) {
//             getUser();
//         }
//     }, [user, isAuthenticated, setUser, history]);

//     return (
//         <>
//             {isAuthenticated && <div>{JSON.stringify(user)}</div>}
//             {isLoading && !error && <p>Loading...</p>}
//             {error && <p>Error: {error.message}</p>}
//         </>
//     );
// }
