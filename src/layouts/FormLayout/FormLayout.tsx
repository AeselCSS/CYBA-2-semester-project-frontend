import { BaseSyntheticEvent, ReactNode } from 'react';
import './FormLayout.css';

interface props {
	children: ReactNode;
	onSubmit: (e?: BaseSyntheticEvent<object, unknown, unknown> | undefined) => Promise<void>;
}

export default function FormLayout({ children, onSubmit }: props) {
	return (
		<section className='form-container'>
			<form className='form-grid' onSubmit={onSubmit}>
				{children}
			</form>
		</section>
	);
}
