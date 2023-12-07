import formatDate from '../../utility/dateFormat';
import { useDisclosure } from '@mantine/hooks';
import { Modal } from '@mantine/core';
import DetailedEmployee from '../Modal/DetailedEmployee';
import { isEmployee, isCar, isCustomer, isOrder } from '../../utility/interfaceChecker';
import DetailedCustomer from '../Modal/DetailedCustomer';
import DetailedOrder from '../Modal/DetailedOrder/DetailedOrder';
import DetailedCar from '../Modal/DetailedCar';
import styles from '../../components/Modal/modal.module.css';
import '../Modal/modal.css';
import { role, department, status } from '../../utility/danishDictionary';
interface Props<T> {
	item: T;
	skipIndexes: number[];
}

export default function TableBodyRow<T extends object>({ item, skipIndexes }: Props<T>) {
	const [isOpen, { open, close }] = useDisclosure(false);

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
			<Modal
				opened={isOpen}
				onClose={close}
				title={detailedComponentTitle}
				centered
				size='xl'
				styles={{ header: { backgroundColor: '#d87005', padding: '10px' }, close: { color: '#f4f4f4', cursor: 'pointer' } }}
				classNames={{ body: styles.body, content: styles.content, title: styles.title, close: styles.close }}
			>
				{detailedComponent}
			</Modal>

			<tr>
				{Object.entries(item).map(([key, value], i) => {
					if (skipIndexes.includes(i)) {
						return null;
					}

					let renderedValue = value as string;

					//Checks if object has the key "role" and creates a new object with the translated value if true
					if (key === 'role') {
						renderedValue = role[value];
					}
					//Checks if object has the key "department" and creates a new object with the translated value if true
					if (key === 'department') {
						renderedValue = department[value];
					}
					//Checks if object has the key "status" and creates a new object with the translated value if true
					if (key === 'status') {
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
