import { useNavigate } from 'react-router-dom';

export default function NavbarLogo() {
	const navigate = useNavigate()

	return (
		<img src="/header-icon-new.png" alt="Kim Dehn Auto A/S" onClick={() => navigate("/")} style={{cursor: 'pointer'}} />
	);
}
