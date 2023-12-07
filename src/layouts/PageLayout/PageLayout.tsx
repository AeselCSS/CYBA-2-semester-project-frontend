import Navbar from '../../components/Navbar/Navbar.tsx';
import Footer from '../../components/Footer/Footer.tsx';

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
