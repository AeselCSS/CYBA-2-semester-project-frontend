interface Props {
	item: any;
	skipValues: string[];
}


export default function TableBodyRow({ item, skipValues }: Props) {

	const skipIndexes: number[] = []

	if (item.id === 'DELETED' || item.customerId === 'DELETED') {
		return null;
	}

	Object.keys(item).forEach((key, i) => {
		skipValues.includes(key) && skipIndexes.push(i);
	});

	return (
		<>
			<tr>
				{Object.values(item).map((value, i) => (

					//@ts-ignore
					skipIndexes.includes(i) ? <></> : <td style={{ paddingLeft: '30px' }} key={item.id + i}>{value}</td>


				))}
			</tr>
		</>
	);
}

