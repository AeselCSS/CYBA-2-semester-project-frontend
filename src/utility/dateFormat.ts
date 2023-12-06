type FormatDateOptions = {
	hour: 'numeric',
	minute: 'numeric',
	day: 'numeric',
	month: 'long',
	year: 'numeric',
	timeZone: string,
  };
  
  const formatDateOptions: FormatDateOptions = {
	hour: 'numeric',
	minute: 'numeric',
	day: 'numeric',
	month: 'long',
	year: 'numeric',
	timeZone: 'Europe/Copenhagen',
  };
  
  const formatDate = (date: Date) => new Intl.DateTimeFormat('da-DK', formatDateOptions).format(date);
  export default formatDate;