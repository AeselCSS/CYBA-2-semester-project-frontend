import * as dictionaries from '../../utility/danishDictionary.ts';
import { GoSortAsc, GoSortDesc } from 'react-icons/go';
import './Table.css';

interface Props {
	title: string;
	handleSort: (title: string) => void;
	itemType: keyof typeof dictionaries;
	sortByValue: string;
	sortDirValue: string;
}

export default function TableHeaderColumn({ title, handleSort, itemType, sortByValue, sortDirValue }: Props) {
	const selectedDictionary = dictionaries[itemType] as Record<string, string>;
	const displayTitle = selectedDictionary[title]; // The translated title for display

	return (
		<th>
			<div className="header-content" onClick={() => handleSort(title)}>
				<span>{displayTitle}</span>
				{title === sortByValue && (
					<span className='sort-icon'>{sortDirValue === 'asc' ? <GoSortAsc /> : <GoSortDesc />}</span>
				)}
			</div>
		</th>
	);
}