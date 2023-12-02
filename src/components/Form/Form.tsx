import { ReactNode } from 'react';
import './Form.css';
import { useForm } from 'react-hook-form';

interface props {
	children: ReactNode;
}

export default function Form({ children, onSubmit }: props) {
	return (
		<div className='form-container'>
			<section className='form-grid'>
                {children}
                </section>
		</div>
	);
}
