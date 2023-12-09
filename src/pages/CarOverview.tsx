import { useContext } from 'react';
import UserContext from '../context/userContext';
import { useNavigate } from 'react-router-dom';
import { userIsEmployee } from '../utility/userRoleChecker';
import PageLayout from '../layouts/PageLayout/PageLayout.tsx';
import Table from "../components/Table/Table.tsx";
import "../components/Table/Table.css"

export default function OrderOverview() {
	const navigate = useNavigate();
	const { user } = useContext(UserContext);

	if (!userIsEmployee(user)) {
		navigate('/redirect');
		return null;
	}

	const skipValues = [
		"id",
		"customerId",
		"createdAt",
		"updatedAt",
		"mileage",
		"lastInspectionDate",
		"firstRegistration",
		"lastInspectionResult",
		"lastInspectionKind"
	]

	return (
		<PageLayout>
			<div className='employee-view-wrapper'>
				<div className='employee-view'>
					<h1 style={{textAlign: "center"}}>Køretøjer</h1>
					<Table<ICar> itemType='car' defaultSortBy='registrationNumber' isFilterable={false} skipValues={skipValues} />
				</div>
			</div>
		</PageLayout>
	);
}