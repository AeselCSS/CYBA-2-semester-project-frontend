import React from 'react';
import * as dictionaries from './danishDictionary.ts';

interface Props {
	title: string;
	handleSort: (e: React.MouseEvent<HTMLElement>) => void;
	itemType: keyof typeof dictionaries;
}

export default function TableHeaderColumn({ title, handleSort, itemType }: Props) {
	const selectedDictionary = dictionaries[itemType] as Record<string, string>;

	return (
		<th id={title} onClick={handleSort}>
			{selectedDictionary[title]}
		</th>
	);
}