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
	// 3 month in the future
	const maxDate = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000);

	const disableTiles = ({ date }: { date: Date }): boolean => {
		// return unavailableDates.some((unavailableDate) => date.toDateString() === new Date(unavailableDate).toDateString())

		if (unavailableDates.some((unavailableDate) => date.toDateString() === new Date(unavailableDate).toDateString())) {
			return true;
		} else if (date.getDay() === 0 || date.getDay() === 6) {
			return true
		}

		return false;
	}

	return (
		<Calendar
			className="calender"
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
	)
}