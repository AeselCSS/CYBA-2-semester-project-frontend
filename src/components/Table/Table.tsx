import { useEffect, useState } from 'react';
import Toolbar from '../Toolbar/Toolbar.tsx';
import Filter from '../Filter/Filter.tsx';
import Searchbar from '../Searchbar/Searchbar.tsx';
import TableBodyRow from './TableBodyRow.tsx';
import ReactPaginate from 'react-paginate';
import PageSize from '../PageSize/PageSize.tsx';

interface Props {
	itemType: string;
	isFilterable?: boolean;
	defaultSortBy: string

}

const filterDictionary: Record<Props['itemType'], string[]> = {
	order: ['AWAITING_CUSTOMER', 'PENDING', 'IN_PROGRESS', 'COMPLETED'],
	employee: ['ADMINISTRATION', 'BODY_WORKSHOP', 'MECHANICAL_WORKSHOP', 'PAINT_SHOP'],
};

export default function Table<T extends object>({ itemType, defaultSortBy, isFilterable = true }:Props) {
	const [data, setData] = useState<T[] | null>(null);
	const [metaData, setMetaData] = useState<IMetaData | null>(null);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [pageSize, setPageSize] = useState<number>(20);
	const [searchValue, setSearchValue] = useState<string>('');
	const [sortByValue, setSortByValue] = useState<string>(defaultSortBy);
	const [sortDirValue, setSortDirValue] = useState<string>('asc');
	const [filterByValue, setFilterByValue] = useState<string>('')

	useEffect(() => {
		//brug itemType og setData() her i fetch
		async function fetchData() {
			const url = `http://localhost:3000/${itemType}s/?sortDir=${sortDirValue}&sortBy=${sortByValue}&searchValue=${searchValue}&pageNum=${currentPage}&pageSize=${pageSize}&filterBy=${filterByValue}`;
			console.log(url);
			const promise = await fetch(url);

			if (promise.ok) {
				const result: APIResponse<T> = await promise.json();
				setData(result.data);
				setMetaData(result.metaData);
			} else {
				console.log('Promise not OK');
				console.log('Error at fetch');
			}
		}

		fetchData();
	}, [searchValue, sortByValue, sortDirValue, filterByValue, currentPage, pageSize, itemType]);

	const calculatePageCount = () => {
		return Math.ceil(metaData!.totalCount / pageSize);
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
				<Searchbar searchValue={searchValue} setSearchValue={setSearchValue} setCurrentPage={setCurrentPage} />
				{isFilterable && (
					<Filter
						filterValue={filterByValue}
						setFilterValue={setFilterByValue}
						setCurrentPage={setCurrentPage}
						filterByOpts={filterDictionary[itemType]}
					/>
				)}
			</Toolbar>

			{!data.length ? (
				<h2>No data found</h2>
			) : (
				<table>
					<thead>
						<tr>
							{Object.keys(data[0]).map((key) => (
								<th
									id={key}
									key={key}
									onClick={(e) => {
										setSortByValue((e.target as HTMLElement).id);
										setSortDirValue((prevState) => (prevState === 'asc' ? 'desc' : 'asc'));
									}}
								>
									{key}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{data.map((item, index) => (
							<TableBodyRow key={index} item={item} />
						))}
					</tbody>
				</table>
			)}

			<ReactPaginate
				pageCount={calculatePageCount()}
				onPageChange={(event) => setCurrentPage(event.selected + 1)}
				pageRangeDisplayed={3}
				breakLabel='...'
				nextLabel='Next'
				previousLabel='Previous'
				renderOnZeroPageCount={null}
				initialPage={0}
			/>

			{data.length ? <PageSize setPageSize={setPageSize} pageSize={pageSize} /> : null}
		</>
	);
}