import formatDate from '../Toolbar/dateFormat.ts';

interface Props<T> {
	item: T;
	skipIndexes: number[];

}

export default function TableBodyRow<T extends object>({ item, skipIndexes }: Props<T>) {

	if ('id' in item && item.id === "DELETED" || 'vinNumber' in item && item.vinNumber === "DELETED") {
		return null;
	}

	return (
		<tr>
			{Object.values(item).map((value, i) => {
				if (skipIndexes.includes(i)) {
					return null;
				}

				let renderedValue = value as string;

				if (typeof value === 'string' && !isNaN(Date.parse(value))) {
					const date = new Date(value);
					renderedValue = formatDate(date);
				}

				return <td style={{ paddingLeft: '30px' }} key={(item.id as number) + i}>{renderedValue}</td>;
			})}
		</tr>
	);



}

/*
return <td style={{ paddingLeft: '30px' }} key={(item.id as number) + i}>{renderedValue}</td>;
*/
