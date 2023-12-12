import PageLayout from '../layouts/PageLayout/PageLayout.tsx';
import { MdEmail, MdPhoneEnabled } from 'react-icons/md';
import { IoIosArrowForward } from 'react-icons/io';
import classes from './boilerplate.module.css';

export default function Contact() {
	return (
		<PageLayout>
			<section className={classes.pageWrapper}>
				<h1>Kontakt</h1>
				<div className={classes.boilerPlateContainer}>
					<iframe
						src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2245.073040719766!2d12.125297177131337!3d55.757233373085846!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46525d613a0efa8d%3A0x99e716993cbc6b4c!2sKim%20Dehn%20Auto!5e0!3m2!1sen!2sdk!4v1702301889705!5m2!1sen!2sdk'
						width='100%'
						height='450'
						style={{ border: '0' }}
						allowFullScreen={true}
						loading='lazy'
						referrerPolicy='no-referrer-when-downgrade'
					></iframe>
					<div className={classes.contactBoxWrapper}>
						<address>
							<h2 className={classes.contactHeader}>Kontaktinformation</h2>
							<h3>Kim Dehn Auto A/S</h3>
							<p>Møllehaven 7</p>
							<p>4040 Jyllinge</p>
							<p>CVR : 41440775</p>
							<br />
							<p>
								<MdPhoneEnabled /> 46789788
							</p>
							<p>
								<MdEmail /> info@kimdehnauto.dk
							</p>
						</address>
						<div>
							<h2 className={classes.contactHeader}>Åbningstider</h2>
							<section className={classes.openingHoursWrapper}>
								<div>
									<p>Mandag</p>
									<p>Tirsdag</p>
									<p>Onsdag</p>
									<p>Torsdag</p>
									<p>Fredag</p>
									<p>Lørdag</p>
									<p>Søndag</p>
								</div>
								<div>
									<p>07:30 - 16:00</p>
									<p>07:30 - 16:00</p>
									<p>07:30 - 16:00</p>
									<p>07:30 - 16:00</p>
									<p>07:30 - 13:00</p>
									<p>Lukket</p>
									<p>Lukket</p>
								</div>
							</section>
						</div>
						<div>
							<h2 className={classes.contactHeader}>Kviklinks</h2>
							<p>
								AutoMester.dk <IoIosArrowForward />
							</p>
							<p>
								Book tid <IoIosArrowForward />
							</p>
						</div>
					</div>
				</div>
			</section>
		</PageLayout>
	);
}
