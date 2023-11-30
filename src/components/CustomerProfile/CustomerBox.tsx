import BoxHeader from './BoxHeader';
import DetailBox from './DetailBox';

export default function CustomerBox({ customerData }: { customerData: IAPISingleCustomer }) {
	console.log(customerData);


	return (
		<div className='profile-box box'>
			<BoxHeader title={'Profil'} btnName='Rediger profil' />

			<section className='customer-box-grid'>
				<DetailBox title={'Fornavn'} value={customerData.customer.firstName} />
				<DetailBox title={'Efternavn'} value={customerData.customer.lastName} />
				<DetailBox title={'Kunde nr.'} value={customerData.customer.id} />
				<DetailBox title={'E-mail'} value={customerData.customer.email} />
				<DetailBox title={'By'} value={customerData.customer.city} />
				<DetailBox title={'Adresse'} value={customerData.customer.address} />
				<DetailBox title={'Post nr.'} value={customerData.customer.zip} />
				<DetailBox title={'Telefon nr.'} value={customerData.customer.phone} />
				<DetailBox title={'Kundeoprettelse'} value={'CreatedAt data mangler'} />
			</section>
		</div>
	);
}
