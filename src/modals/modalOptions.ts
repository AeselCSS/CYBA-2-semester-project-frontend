import styles from './modal.module.css';

export const getModalOptions = (title: string, size?: string) => {
	return {
		title: title,
		centered: true,
		size: size || 'xl',
		styles: {
			header: { backgroundColor: '#d87005', padding: '10px' },
			close: { color: '#f4f4f4', cursor: 'pointer' }
		},
		classNames: {
			body: styles.body,
			content: styles.content,
			title: styles.title,
			close: styles.close
		}
	};
};