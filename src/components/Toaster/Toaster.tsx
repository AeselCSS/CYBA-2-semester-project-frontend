import { Notifications } from '@mantine/notifications';
import { MantineProvider } from '@mantine/core';



export default function Toaster() {

	return (
		<MantineProvider>
			<Notifications className="toaster" autoClose={3500}  />
		</MantineProvider>
	);
}