import React from 'react';
import * as dictionaries from '../../utility/danishDictionary.ts';
import { GoSortAsc } from 'react-icons/go';
import { GoSortDesc } from 'react-icons/go';
import './Table.css';

interface Props {
	title: string;
	handleSort: (e: React.MouseEvent<HTMLElement>) => void;
	itemType: keyof typeof dictionaries;
	sortByValue: string;
	sortDirValue: string;
}

export default function TableHeaderColumn({ title, handleSort, itemType, sortByValue, sortDirValue }: Props) {
	const selectedDictionary = dictionaries[itemType] as Record<string, string>;

	const excludeSort = itemType === 'order' && (title.includes('registrationNumber') || title.includes('vinNumber'));

	return (
		<th>
			<span className={!excludeSort ? 'pointer' : 'disable-click'} onClick={handleSort} id={title}>
				{selectedDictionary[title]}
			</span>
			{title === sortByValue && (
				<span className='disable-click sort-icon'>{sortDirValue === 'asc' ? <GoSortAsc /> : <GoSortDesc />}</span>
			)}
		</th>
	);
}
