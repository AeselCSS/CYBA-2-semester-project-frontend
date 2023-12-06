import React from 'react';
import "./PageSize.css"

interface Props {
	pageSize: number;
	setPageSize: (newPageSize: number) => void;
	setCurrentPage: (newPage: number) => void;
}

export default function PageSize({ pageSize, setPageSize, setCurrentPage }: Props) {
	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const newPageSize = parseInt(e.target.value);
		setPageSize(newPageSize);
		setCurrentPage(1);
	};

	return (
		<>
			<label htmlFor='size'>Antal pr. side</label>
			<select value={pageSize} onChange={handleChange} name='size' id='size'>
				<option value='5'>5</option>
				<option value='10'>10</option>
				<option value='20'>20</option>
				<option value='30'>30</option>
				<option value='50'>50</option>
			</select>
		</>
	);
}
