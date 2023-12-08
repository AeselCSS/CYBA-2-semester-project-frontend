import { IoIosCheckmarkCircleOutline } from 'react-icons/io';
import { MdErrorOutline } from 'react-icons/md';

interface NotificationMessageProps {
	title: string;
	message: string;
}

export const NotificationMessageSuccess = ({ title, message }: NotificationMessageProps) => {
	return {
		color: 'green',
		title: title,
		message: message,
		icon: <IoIosCheckmarkCircleOutline />
	};
};

export const NotificationMessageError = ({ title, message }: NotificationMessageProps) => {
	return {
		color: 'red',
		title: title,
		message: message,
		icon: <MdErrorOutline />
	};
};

