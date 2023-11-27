import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Auth0Provider } from "@auth0/auth0-react"

//! Den trigger fejlen:
// import 'dotenv/config';

// const domain = process.env.REACT_APP_AUTH0_DOMAIN as string;
// const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID as string;
// const redirectUri = process.env.REACT_APP_AUTH0_CALLBACK_URL as string;

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Auth0Provider domain="cyba.eu.auth0.com" clientId="GDkfvz5P03qP7XCkKgRwJVJtrnI6ehKi" authorizationParams={{ redirect_uri: "http://localhost:4040/callback" }} >
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Auth0Provider>
	</React.StrictMode>,
);
