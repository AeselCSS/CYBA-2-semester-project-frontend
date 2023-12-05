import Calendar from 'react-calendar';

type TDatePiece = Date | null;
type TDate = TDatePiece | [TDatePiece, TDatePiece]

interface Props {
	unavailableDates: string[],
	date: TDate,
	setDate: (newValue: TDate) => void;
}

export default function DatePicker({unavailableDates, date, setDate}: Props) {
	const currentDate = new Date();
	// 5 Days in the future
	const minDate = new Date(currentDate.getTime() + 5 * 24 * 60 * 60 * 1000);

	const disableTiles = ({ date }: { date: Date }): boolean => {
		if (unavailableDates.some((unavailableDate) => date.toDateString() === new Date(unavailableDate).toDateString())){
			return true
		} else if (date.getDay() === 0 || date.getDay() === 6) {
			//If day is saturday or sunday
			return true
		}

		return false
	}

	return (
		<Calendar
			className="calender"
			value={date}
			onChange={(value) => setDate(value)}
			minDate={minDate}
			tileDisabled={disableTiles}
			nextLabel='>'
			prevLabel='<'
			minDetail='year'
		/>
	)
}