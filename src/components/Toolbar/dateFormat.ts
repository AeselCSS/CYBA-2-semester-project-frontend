const formatDateOptions = {
	weekday: 'long' as "long",
	day: 'numeric' as "numeric",
	month: 'long' as "long",
	year: 'numeric' as "numeric",
	timeZone: 'Europe/Copenhagen',
} ;

const formatDate = (date: Date) => new Intl.DateTimeFormat('da-DK', formatDateOptions).format(date);
export default formatDate;