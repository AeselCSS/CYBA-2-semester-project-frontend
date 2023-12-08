import React from 'react';

interface props {
	btnText: string;
	onClick: (e: React.MouseEvent, ...args: unknown[]) => void;
}

export default function ChangeOrderStatusButton({ btnText, onClick }: props) {
	return <button onClick={onClick}>{btnText}</button>;
}
