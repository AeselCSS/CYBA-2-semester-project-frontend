import { useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';

export default function GoBackButton() {
	const navigate = useNavigate();

	return (
		<div className='go-back-btn-container'>
			<button onClick={() => navigate(-1)}>
				<IoIosArrowBack />
				Tilbage
			</button>
		</div>
	);
}
