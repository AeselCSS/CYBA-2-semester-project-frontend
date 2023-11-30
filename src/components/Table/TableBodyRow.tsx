import formatDate from '../Toolbar/dateFormat.ts';

interface Props {
	item: any;
	skipIndexes: number[];
}

export default function TableBodyRow({ item, skipIndexes }: Props) {

	if (item.id === "DELETED" || item.customerId === "DELETED") {
		return null;
	}

	return (
		<tr>
			{Object.values(item).map((value, i) => {
				if (skipIndexes.includes(i)) {
					return null;
				}

				let renderedValue = value as string;

				if (typeof value === "string" && !isNaN(Date.parse(value))) {
					const date = new Date(value);
					renderedValue = formatDate(date); // Assuming you have formatDate function defined
				}

				return <td style={{ paddingLeft: '30px' }} key={item.id + i}>{renderedValue}</td>;
			})}
		</tr>
	);
}

