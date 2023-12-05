import Calendar from 'react-calendar';

type TDatePiece = Date | null;
type TDate = TDatePiece | [TDatePiece, TDatePiece]

interface Props {
	unavailableDates: string[],
	date: TDate | null,
	setDate: (newValue: TDate) => void;
}

export default function DatePicker({unavailableDates, date, setDate}: Props) {
	// 5 Days in the future
	const minDate = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000);
	// 2 month in the future
	const maxDate = new Date(Date.now() + 60 * 24 * 60 * 60 * 1000);

	const disableTiles = ({ date }: { date: Date }): boolean => {
		return unavailableDates.some((unavailableDate) => date.toDateString() === new Date(unavailableDate).toDateString())
	}

	return (
		<Calendar
			className="calender"
			value={date}
			onChange={(value) => setDate(value)}
			minDate={minDate}
			maxDate={maxDate}
			tileDisabled={disableTiles}
			nextLabel='>'
			prevLabel='<'
			minDetail='year'
		/>
	)
}