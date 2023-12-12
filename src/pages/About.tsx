import PageLayout from '../layouts/PageLayout/PageLayout.tsx';

export default function About() {
	return (
		<PageLayout>
			<section>
				<h1>Om os</h1>

				<iframe
					src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2245.073040719766!2d12.125297177131337!3d55.757233373085846!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46525d613a0efa8d%3A0x99e716993cbc6b4c!2sKim%20Dehn%20Auto!5e0!3m2!1sen!2sdk!4v1702301889705!5m2!1sen!2sdk'
					width='600'
					height='450'
					style={{ border: '0' }}
					allowFullScreen={true}
					loading='lazy'
					referrerPolicy='no-referrer-when-downgrade'
				></iframe>

				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis laudantium quibusdam aliquid itaque voluptas odit nemo
					dignissimos accusamus facere excepturi! Vero repellat nisi, distinctio placeat ratione sunt eos culpa veritatis.
				</p>
			</section>
		</PageLayout>
	);
}
