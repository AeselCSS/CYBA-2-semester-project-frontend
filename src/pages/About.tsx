import PageLayout from '../layouts/PageLayout/PageLayout.tsx';
import classes from './boilerplate.module.css'

export default function About() {
	return (
		<PageLayout>
			<section className={classes.pageWrapper}>
				<h1>Serviceydelser på vores værksted</h1>
				<div className={classes.servicePageWrapper}>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis laudantium quibusdam aliquid itaque voluptas odit
						nemo dignissimos accusamus facere excepturi! Vero repellat nisi, distinctio placeat ratione sunt eos culpa
						veritatis.
					</p>
				</div>
			</section>
		</PageLayout>
	);
}
