import { useAuth0 } from '@auth0/auth0-react';
import { SignupButton } from '../components/Buttons/SignupButton.tsx';
import PageLayout from '../layouts/PageLayout/PageLayout.tsx';
import classes from './boilerplate.module.css';
import { NavLink } from 'react-router-dom';

export default function Homepage() {
	const { isAuthenticated } = useAuth0();
	return (
		<PageLayout>
			<section className={classes.pageWrapper}>
				<h1>Velkommen til Kim Dehn Auto</h1>
				<div className={classes.boilerPlateContainer}>
					<div className={classes.homepageGrid}>
						<div><img src='homepage-pic3.jpg' alt='mechanics working on a car' /></div>
						<div>
							<p>
								Velkommen til Kim Dehn Auto - din dedikerede partner inden for autoarbejde. Hvem er vi? Vi er et erfarent
								team af teknikere, der lægger stor vægt på faglig kvalitet og højt serviceniveau. Vores engagement i
								bilindustrien strækker sig over projekter af alle størrelser, og vi er stolte af at kunne tilbyde
								professionelle løsninger.
							</p>
							<br />
							<p>
								Hos Kim Dehn Auto forstår vi vigtigheden af kvalitet og tillid i vores arbejde. Vi mener, at hver kunde skal
								føle sig tryg ved, at deres bil modtager den korrekte opmærksomhed og pleje. Derfor er vores mål altid at
								levere et stykke arbejde, der indfrier kundens forventninger i henhold til aftalegrundlaget.
							</p>
							<div className={classes.centerContainer}>
								<NavLink to='/services'>
									<button>Se hvad vi tilbyder!</button>
								</NavLink>
							</div>
							<br />
						</div>
						<div>
							<p>
								Vi er ikke kun et autoværksted; vi er din pålidelige samarbejdspartner. Vores erfarne teknikere investerer
								løbende i opgradering af værktøj og udstyr, så vi kan håndtere de nyeste bilmodeller og avancerede
								teknologier på markedet. Uanset om det drejer sig om almindelig vedligeholdelse, reparationer eller
								teknologiske opgraderinger, kan du stole på, at vi leverer en professionel og pålidelig service.
							</p>
							<br />
							<p>
								Vores filosofi er baseret på at opbygge langvarige relationer med vores kunder. Vi tror på gennemsigtighed,
								tillid og konstant faglig udvikling for at imødekomme fremtidige udfordringer. Vælg Kim Dehn Auto for en
								unik kombination af ekspertise, personlig service og dedikation til din bilpleje.
							</p>
								{!isAuthenticated && (
									<div className={classes.centerContainer}>
										<SignupButton />
									</div>
								)}
						</div>
						<div><img src='homepage-pic2.jpg' alt='mechanic working on a car' /></div>
					</div>
				</div>
			</section>
		</PageLayout>
	);
}
