import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

interface Props {
	children: React.ReactNode;
}

export default function PageLayout({ children }: Props) {
	return (
		<>
			<Navbar />
			<main className='page-layout'>{children}</main>
			<Footer />
		</>
	);
}
