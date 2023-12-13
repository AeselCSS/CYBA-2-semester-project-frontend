import PageLayout from '../layouts/PageLayout/PageLayout.tsx';
import classes from './boilerplate.module.css';
import { IoMdCheckmark } from 'react-icons/io';

export default function Services() {
	return (
		<PageLayout>
			<section className={classes.pageWrapper}>
				<h1>Serviceydelser på vores værksted</h1>
				<div className={classes.boilerPlateContainer}>
					<p>
						<IoMdCheckmark color='lightgreen' />
						Vi servicerer og reparerer alle biler , uanset mærke og årgang - også i garantiperioden på helt nye biler.
					</p>
					<div className={classes.servicesContainer}>
						<div>
							<h2>Services</h2>
							<ul>
								<li>2-hjulsudmåling</li>
								<li>4 gas måling</li>
								<li>4-hjulsudmåling</li>
								<li>Autohjælp</li>
								<li>Autolakering</li>
								<li>Autoopretning</li>
								<li>Autopolstring</li>
								<li>Autotransport</li>
								<li>Bilpleje</li>
								<li>Bremseprøvestand</li>
								<li>Centrallås</li>
								<li>Fejlkodelæsning</li>
								<li>Motorprøvestand</li>
								<li>Olieskift</li>
								<li>Rustbeskyttelse</li>
								<li>Serviceeftersyn</li>
								<li>Skadeservice</li>
								<li>Speciel indretning</li>
								<li>Undervognsbehandling</li>
								<li>Værkstedsbil /lånebil</li>
							</ul>
						</div>
						<div>
							<h2>Salg og montering af</h2>
							<ul>
								<li>Aircondition</li>
								<li>Audiomontering</li>
								<li>Autoalarmer</li>
								<li>Autoglas</li>
								<li>Autokølere</li>
								<li>Autostereo</li>
								<li>Dækafbalancering</li>
								<li>Dækmontering</li>
								<li>Elanlæg</li>
								<li>Elektronik</li>
								<li>Elruder</li>
								<li>GPS tyverisikring (satelitovervågning)</li>
								<li>Klargøring til syn</li>
								<li>Klimaanlæg</li>
								<li>Lakskader</li>
								<li>Mobiltelefon</li>
								<li>Motorstyring</li>
								<li>Navigationsanlæg</li>
							</ul>
						</div>
						<div>
							<h2>Reparation af</h2>
							<ul>
								<li>Biler</li>
								<li>Motorcykler</li>
								<li>ATV</li>
								<li>Scooter</li>
								<li>Trailer</li>
								<li>Veteranbiler</li>
								<li>Dæk og fælge</li>
								<li>Havemaskiner</li>
							</ul>
							<br />
							<h2>Faciliteter</h2>
							<ul>
								<li>Dækhotel</li>
								<li>Skadecenter</li>
								<li>Ventestue</li>
							</ul>
							<br />
							<h2>Salg af</h2>
							<ul>
								<li>Dæk og fælge</li>
							</ul>
						</div>
					</div>
				</div>
			</section>
		</PageLayout>
	);
}
