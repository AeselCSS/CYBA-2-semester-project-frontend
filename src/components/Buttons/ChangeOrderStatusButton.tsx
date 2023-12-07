interface props {
	btnText: string;
	onClick: () => void;
}

export default function ChangeOrderStatusButton({ btnText, onClick }: props) {
	return <button onClick={onClick}>{btnText}</button>;
}
