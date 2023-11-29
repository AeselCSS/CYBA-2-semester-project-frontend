interface Props {
	item: any;
	skipIndexes: number[];
}

export default function TableBodyRow({ item, skipIndexes }: Props) {

	return (
		<>
			<tr>
				{Object.values(item).map((value, i) => (
					//@ts-ignore
					skipIndexes.includes(i) ? null : <td style={{ paddingLeft: '30px' }} key={item.id + i}>{value}</td>
				))}
			</tr>
		</>
	);
}

