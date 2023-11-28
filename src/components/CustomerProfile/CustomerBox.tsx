import BoxHeader from './BoxHeader';
import DetailBox from './DetailBox';

export default function CustomerBox({ customerData }: { customerData: IAPISingleCustomer }) {
	console.log(customerData.customer.lastName);

	const fullName = `${customerData.customer.firstName} ${customerData.customer.lastName}`;

	return (
		<div className='profile-box'>
			<BoxHeader title={fullName} btnName='Rediger profil' />

			<section className='customer-box-grid'>
				<DetailBox title={'Fornavn'} value={customerData.customer.firstName} />
				<DetailBox title={'Efternavn'} value={customerData.customer.lastName} />
				<DetailBox title={'Kundenummer'} value={customerData.customer.id} />
				<DetailBox title={'Email'} value={customerData.customer.email} />
				<DetailBox title={'By'} value={customerData.customer.city} />
				<DetailBox title={'Adresse'} value={customerData.customer.address} />
				<DetailBox title={'Postnummber'} value={customerData.customer.zip} />
				<DetailBox title={'Telefonnummer'} value={customerData.customer.phone} />
				<DetailBox title={'Kundeoprettelse'} value={String(customerData.customer.createdAt)} />
			</section>
		</div>
	);
}
