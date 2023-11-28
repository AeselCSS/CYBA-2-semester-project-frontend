import { useEffect, useState } from 'react';
import Toolbar from '../Toolbar/Toolbar.tsx';
import Filter from '../Filter/Filter.tsx';
import Searchbar from '../Searchbar/Searchbar.tsx';
import SortWrapper from '../Sort/SortWrapper.tsx';
import TableBodyRow from './TableBodyRow.tsx';
import ReactPaginate from 'react-paginate';

interface Props {
	itemType: string;
	isFilterable?: boolean;
	defaultSortBy: string;
}

export default function Table({ itemType, defaultSortBy, isFilterable = true }: Props) {
	const [data, setData] = useState<any[] | null>(null);
	const [metaData, setMetaData] = useState<any>(null);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [pageSize] = useState<number>(20);
	const [searchValue, setSearchValue] = useState<string>('');
	const [sortByValue, setSortByValue] = useState<string>(defaultSortBy);
	const [sortDirValue, setSortDirValue] = useState<string>('asc');
	const [filterByValue, setFilterByValue] = useState<string>('');

	useEffect(() => {
		//brug itemType og setData() her i fetch
		async function fetchData() {
			const url = `http://localhost:3000/${itemType}s/?sortDir=${sortDirValue}&sortBy=${sortByValue}&searchValue=${searchValue}&pageNum=${currentPage}&pageSize=${pageSize}&filterBy=${filterByValue}`;
			console.log(url);
			const promise = await fetch(url);

			if (promise.ok) {
				const result = await promise.json();
				setData(result.data);
				setMetaData(result.metaData);
			}
		}

		fetchData();
	}, [searchValue, sortByValue, sortDirValue, filterByValue, currentPage, pageSize]);

	const calculcatePageCount = () => {
		return Math.ceil(metaData.totalCount / pageSize);
	};

	/*const sortByOpts = Object.keys(data!).map((key) => {
     return key;
     });*/

	if (!data) {
		return <p>Loading...</p>;
	}

	return (
		<>
			<Toolbar>
				<SortWrapper
					sortDirValue={sortDirValue}
					setSortDirValue={setSortDirValue}
					sortByValue={sortByValue}
					setSortByValue={setSortByValue}
					sortByOpts={['status', 'id']}
				/>
				<Searchbar searchValue={searchValue} setSearchValue={setSearchValue} />
				{isFilterable ?? (
					<Filter
						filterValue={filterByValue}
						setFilterValue={setFilterByValue}
						filterByOpts={['COMPLETED', 'AWAITING_CUSTOMER', 'PENDING']}
					/>
				)}
			</Toolbar>

			{!data.length ? (
				<table>
					<h2>No data found</h2>
				</table>
			) : (
				<table>
					<thead>
						<tr>
							{Object.keys(data[0]).map((key) => (
								<th key={key}>{key}</th>
							))}
						</tr>
					</thead>
					<tbody>
						{/*@ts-ignore*/}
						{data.map((index) => (
							<TableBodyRow item={index} />
						))}
					</tbody>
				</table>
			)}

			<ReactPaginate
				pageCount={calculcatePageCount()}
				onPageChange={(event) => setCurrentPage(event.selected + 1)}
				pageRangeDisplayed={3}
				breakLabel='...'
				nextLabel='Next'
				previousLabel='Previous'
				renderOnZeroPageCount={null}
				initialPage={0}
			/>
		</>
	);
}
