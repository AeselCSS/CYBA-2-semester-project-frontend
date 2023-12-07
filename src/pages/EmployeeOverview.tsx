import { useContext } from 'react';
import UserContext from '../context/userContext';
import { useNavigate } from 'react-router-dom';
import { userIsEmployee } from '../utility/userRoleChecker';
import PageLayout from '../layouts/PageLayout/PageLayout.tsx';
import Table from "../components/Table/Table.tsx";
import "../components/Navbar/EmployeeNavigation/EmployeeView.css"

export default function EmployeeOverview() {
	const navigate = useNavigate();
	const { user } = useContext(UserContext);

	if (!userIsEmployee(user)) {
		navigate('/redirect');
		return null;
	}

	const skipValues = [
		"id",
		"createdAt",
		"updatedAt"
	]

	return (
		<PageLayout>
			<div className='employee-view-wrapper'>
				<div className='employee-view'>
					<h1 style={{textAlign: "center"}}>Ansatte</h1>
					<Table<IEmployee> itemType='employee' defaultSortBy='firstName' skipValues={skipValues} />
				</div>
			</div>
		</PageLayout>
	);
}
