import { LogoutOptions, RedirectLoginOptions } from '@auth0/auth0-react';

export const handleLogout = (logout: (options?: LogoutOptions) => Promise<void>, options?: LogoutOptions) => {
	// remove userData from localStorage
	localStorage.removeItem('userData');

	// Set default options if none are provided
	const defaultOptions: LogoutOptions = {
		logoutParams: {
			returnTo: window.location.origin,
		},
	};
	// Pass either the provided options or the default ones
	logout(options || defaultOptions);
};

export const handleLogin = async (loginWithRedirect: (options?: RedirectLoginOptions) => Promise<void>) => {
	await loginWithRedirect({
		appState: {
			returnTo: '/redirect',
		},
		authorizationParams: {
			prompt: 'login',
		},
	});
};

export const handleSignUp = async (loginWithRedirect: (options?: RedirectLoginOptions) => Promise<void>) => {
	await loginWithRedirect({
		appState: {
			returnTo: '/redirect',
		},
		authorizationParams: {
			prompt: 'login',
			screen_hint: 'signup',
		},
	});
};