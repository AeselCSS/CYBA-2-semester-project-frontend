import Calendar from 'react-calendar';

type TDatePiece = Date | null;
type TDate = TDatePiece | [TDatePiece, TDatePiece]

interface Props {
	unavailableDates: string[],
	date: TDate,
	setDate: (newValue: TDate) => void;
}

export default function DatePicker({unavailableDates, date, setDate}: Props) {

	const disableTiles = ({ date }: { date: Date }): boolean => {
		return unavailableDates.some((unavailableDate) => date.toISOString().split('T')[0] === unavailableDate);
	}

	return (
		<Calendar
			className='calender'

			value={date}
			onChange={(value) => setDate(value)}
			tileDisabled={disableTiles}
			nextLabel='>'
			prevLabel='<'
			minDetail='year'
			minDate={new Date()}
		/>
	)
}