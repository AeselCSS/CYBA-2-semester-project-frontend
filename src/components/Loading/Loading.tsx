import React from 'react';
import { Loader } from '@mantine/core';
import './Loading.css';

const Loading: React.FC = () => {
	return (
		<div className='loading-wrapper'>
			<Loader color='orange' type='bars' />
		</div>
	);
};

export default Loading;