import formatDate from '../../utility/dateFormat.ts';

import { useDisclosure } from '@mantine/hooks';
import { Modal } from '@mantine/core';
import DetailedEmployee from '../Modal/DetailedEmployee.tsx';
import "../Modal/modal.css"
import { isEmployee, isCar, isCustomer, isOrder } from '../../utility/interfaceChecker.ts';
import DetailedCustomer from '../Modal/DetailedCustomer.tsx';
import DetailedOrder from '../Modal/DetailedOrder.tsx';
import DetailedCar from '../Modal/DetailedCar.tsx';


interface Props<T> {
	item: T;
	skipIndexes: number[];
}

export default function TableBodyRow<T extends object>({ item, skipIndexes }: Props<T>) {
	const [opened, { open, close }] = useDisclosure(false);

	if (('id' in item && item.id === 'DELETED') || ('vinNumber' in item && item.vinNumber === 'DELETED')) {
		return null;
	}

	let detailedComponent = null;

	if (isOrder(item)) {
		detailedComponent = <DetailedOrder order={item as IOrder} />;
	} else if (isCar(item)) {
		detailedComponent = <DetailedCar car={item as ICar} />;
	} else if (isEmployee(item)) {
		detailedComponent = <DetailedEmployee employee={item as IEmployee} />;
	} else if (isCustomer(item)) {
		detailedComponent = <DetailedCustomer customer={item as ICustomer} />;
	}

	

	return (
		<>
			<Modal opened={opened} onClose={close} title='Authentication' className='modal' centered>
				{/* Modal content */}
				<h2>Hej</h2>

				{detailedComponent}

				{/* {if (("customerId" in item && "vinNumber" in item)) {
					//Order
				} else if (("brand" in item)) {
					//Car
				} else}
				
				<DetailedCustomer customer={item} />
				<DetailedCar car={item} />
				<DetailedOrder order={item} />
				<DetailedEmployee employee={item}/> */}
			</Modal>
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
					//TODO Employee view viser departments på engelsk. Dictionary skal bruges.

					return (
						<td key={(item as { id: number | string }).id + String(i)} onClick={open}>
							{renderedValue}
						</td>
					);
				})}
			</tr>
		</>
	);
}

/*
 return <td style={{ paddingLeft: '30px' }} key={(item.id as number) + i}>{renderedValue}</td>;
*/
