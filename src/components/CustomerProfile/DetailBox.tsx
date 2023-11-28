export default function DetailBox({ title, value }: { title: string; value: string | number | undefined }) {
	return (
		<div>
			{title}
			<h3>{value}</h3>
		</div>
	);
}
