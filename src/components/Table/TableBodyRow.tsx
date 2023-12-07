import formatDate from '../../utility/dateFormat';
import { useDisclosure } from '@mantine/hooks';
import { Modal } from '@mantine/core';
import DetailedEmployee from '../../modals/DetailedEmployee.tsx';
import { isEmployee, isCar, isCustomer, isOrder } from '../../utility/interfaceChecker';
import DetailedCustomer from '../../modals/DetailedCustomer.tsx';
import DetailedOrder from '../../modals/DetailedOrder/DetailedOrder';
import DetailedCar from '../../modals/DetailedCar.tsx';
import '../../modals/modal.css';


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
