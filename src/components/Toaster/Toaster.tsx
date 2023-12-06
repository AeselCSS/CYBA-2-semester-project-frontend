import { Notifications } from '@mantine/notifications';



export default function Toaster() {

	return (
		<Notifications className="toaster" autoClose={3500}  />
	);
}