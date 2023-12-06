import formatDate from '../../utility/dateFormat';
import { useDisclosure } from '@mantine/hooks';
import { Modal } from '@mantine/core';
import DetailedEmployee from '../Modal/DetailedEmployee';
import { isEmployee, isCar, isCustomer, isOrder } from '../../utility/interfaceChecker';
import DetailedCustomer from '../Modal/DetailedCustomer';
import DetailedOrder from '../Modal/DetailedOrder/DetailedOrder';
import DetailedCar from '../Modal/DetailedCar';
import '../Modal/modal.css';
import { role, department, status } from '../../utility/danishDictionary';
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
	let detailedComponentTitle = null;

	if (isOrder(item as EntityUnion)) {
		detailedComponent = <DetailedOrder orderId={(item as ICurrentOrder).id} />;
		detailedComponentTitle = `Ordre id: ${(item as ICurrentOrder).id}`;
	} else if (isCar(item as EntityUnion)) {
		detailedComponent = <DetailedCar car={item as ICar} />;
		detailedComponentTitle = `Bil: ${(item as ICar).registrationNumber}`;
	} else if (isEmployee(item as EntityUnion)) {
		detailedComponent = <DetailedEmployee employee={item as IEmployee} />;
		detailedComponentTitle = `Medarbejder: ${(item as IEmployee).firstName} ${(item as IEmployee).lastName}`;
	} else if (isCustomer(item as EntityUnion)) {
		detailedComponent = <DetailedCustomer customer={item as ICustomer} />;
		detailedComponentTitle = `Kunde: ${(item as ICustomer).firstName} ${(item as ICustomer).lastName}`;
	}

	return (
		<>
			<Modal opened={opened} onClose={close} title={detailedComponentTitle} className='modal' centered>
				{detailedComponent}
			</Modal>

			<tr>
				{Object.entries(item).map(([key, value], i) => {
					if (skipIndexes.includes(i)) {
						return null;
					}

					let renderedValue = value as string;
					if (key === 'role') {
						item = { ...item, role: role[value] };
						renderedValue = role[value];
					}
					if (key === 'department') {
						item = { ...item, department: department[value] };
						renderedValue = department[value];
					}

					if (key === 'status') {
						item = { ...item, status: status[value] };
						renderedValue = status[value];
					}

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
