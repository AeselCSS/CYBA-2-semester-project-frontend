import Calendar from 'react-calendar';
import './Calender.css';

type TDatePiece = Date | null;
type TDate = TDatePiece | [TDatePiece, TDatePiece];

interface Props {
	unavailableDates: string[];
	date: TDate | null;
	setDate: (newValue: TDate) => void;
}

export default function DatePicker({ unavailableDates, date, setDate }: Props) {
	// 5 Days in the future
	const minDate = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000);
	// 3 month in the future
	const maxDate = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000);

	const disableTiles = ({ date }: { date: Date }): boolean => {
		// Disable dates that are in the past or weekends
		return (
			unavailableDates.some((unavailableDate) => date.toDateString() === new Date(unavailableDate).toDateString()) ||
			[0, 6].includes(date.getDay())
		);
	};

	return (
		<Calendar
			className='calender'
			showNeighboringMonth={false}
			value={date}
			onChange={(value) => setDate(value)}
			minDate={minDate}
			maxDate={maxDate}
			tileDisabled={disableTiles}
			nextLabel='>'
			prevLabel='<'
			minDetail='year'
		/>
	);
}
