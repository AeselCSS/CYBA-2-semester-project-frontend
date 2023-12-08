import { UserProvider } from './context/UserProvider.tsx';
import { MantineProvider } from '@mantine/core';
import Toaster from './components/Toaster/Toaster.tsx';
import '@mantine/core/styles.css';
import { AppRoutes } from './routes/AppRoutes.tsx';

function App() {
	return (
		<UserProvider>
			<MantineProvider>
				<Toaster />
				<AppRoutes />
			</MantineProvider>
		</UserProvider>
	);
}

export default App;
