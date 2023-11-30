import React from 'react';
import * as dictionaries from './danishDictionary.ts';
import { GoSortAsc } from 'react-icons/go';
import { GoSortDesc } from 'react-icons/go';

interface Props {
	title: string;
	handleSort: (e: React.MouseEvent<HTMLElement>) => void;
	itemType: keyof typeof dictionaries;
	sortByValue: string,
	sortDirValue: string
}

export default function TableHeaderColumn({ title, handleSort, itemType, sortByValue, sortDirValue }: Props) {
	const selectedDictionary = dictionaries[itemType] as Record<string, string>;

	return (
		<>
			<th id={title} onClick={handleSort}>
				{selectedDictionary[title]}
				{title === sortByValue && (
					<>{sortDirValue === 'asc' ? <GoSortDesc /> : <GoSortAsc />}</>
				)}
			</th>
		</>
	);
}


