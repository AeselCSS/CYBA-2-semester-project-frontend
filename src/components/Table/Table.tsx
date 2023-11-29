import React, { useEffect, useState } from 'react';
import Toolbar from '../Toolbar/Toolbar.tsx';
import Filter from '../Filter/Filter.tsx';
import Searchbar from '../Searchbar/Searchbar.tsx';
import TableBodyRow from './TableBodyRow.tsx';
import ReactPaginate from 'react-paginate';
import PageSize from '../PageSize/PageSize.tsx';
import TableHeaderColumn from './TableHeaderColumn.tsx';

interface Props {
	itemType: string;
	isFilterable?: boolean;
	defaultSortBy: string;
	skipValues: string[];
}

const filterDictionary: Record<Props['itemType'], object> = {
	order: {
		AWAITING_CUSTOMER: 'Afventer kunde',
		PENDING: 'Afventer værksted',
		IN_PROGRESS: 'Igangsat',
		COMPLETED: "Fuldført"
	},
	employee: {
		ADMINISTRATION: "Administration",
		BODY_WORKSHOP: "Body Workshop",
		MECHANICAL_WORKSHOP: "Værkstedet",
		PAINT_SHOP: "Paint Shop"
	},
};

export default function Table<T extends object>({ itemType, defaultSortBy, skipValues, isFilterable = true }: Props) {
	const [data, setData] = useState<T[] | null>(null);
	const [metaData, setMetaData] = useState<IMetaData | null>(null);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [pageSize, setPageSize] = useState<number>(20);
	const [searchValue, setSearchValue] = useState<string>('');
	const [sortByValue, setSortByValue] = useState<string>(defaultSortBy);
	const [sortDirValue, setSortDirValue] = useState<string>('asc');
	const [filterByValue, setFilterByValue] = useState<string>('');
	const skipIndexes: number[] = [];

	useEffect(() => {
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
	}, [searchValue, sortByValue, sortDirValue, filterByValue, currentPage, pageSize]);

	const handleSort = (e: React.MouseEvent<HTMLElement>) => {
		setSortByValue((e.target as HTMLElement).id);
		setSortDirValue((prevState) => (prevState === 'asc' ? 'desc' : 'asc'));
	};

	const calculatePageCount = () => {
		return Math.ceil(metaData!.totalCount / pageSize);
	};

	if (data && data.length) {
		Object.keys(data[0]).forEach((key, i) => {
			skipValues.includes(key) && skipIndexes.push(i);
		});
	}


	return !data ? (
		<p>Loading...</p>
	) : (
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
						{Object.keys(data[0]).map((key, i) => (
							skipIndexes.includes(i) ? null :
								<TableHeaderColumn key={key} title={key} handleSort={handleSort} itemType={itemType} />
						))}
					</tr>
					</thead>
					<tbody>
					{data.map((item, index) =>
						<TableBodyRow key={index} item={item} skipIndexes={skipIndexes} />,
					)}
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