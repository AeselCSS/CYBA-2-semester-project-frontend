import { useEffect, useState } from 'react';
import Toolbar from '../Toolbar/Toolbar.tsx';
import Filter from '../Toolbar/Filter/Filter.tsx';
import Searchbar from '../Toolbar/Searchbar/Searchbar.tsx';
import TableBodyRow from './TableBodyRow.tsx';
import ReactPaginate from 'react-paginate';
import PageSize from '../PageSize/PageSize.tsx';
import TableHeaderColumn from './TableHeaderColumn.tsx';
import './Table.css';
import * as dictionaries from '../../utility/danishDictionary.ts';
import { getTableData } from '../../services/tableDataServices.ts';
import usePagination from '../../hooks/usePagination.ts';
import { Loader } from '@mantine/core';

interface Props {
	itemType: string;
	isFilterable?: boolean;
	defaultSortBy: string;
	skipValues: string[];
}

export default function Table<T extends object>({ itemType, defaultSortBy, skipValues, isFilterable = true }: Props) {
	const [data, setData] = useState<T[] | null>(null);
	const [metaData, setMetaData] = useState<IMetaData | null>(null);
	const [pageSize, setPageSize] = useState<number>(20);
	const [searchValue, setSearchValue] = useState<string>('');
	const [sortByValue, setSortByValue] = useState<string>(defaultSortBy);
	const [sortDirValue, setSortDirValue] = useState<string>('asc');
	const [filterByValue, setFilterByValue] = useState<string>('');
	const skipIndexes: number[] = [];

	const metaDataTotalCount = metaData ? metaData.totalCount : 0;
	const { currentPage, setCurrentPage, paginationSettings } = usePagination(pageSize, metaDataTotalCount);


	useEffect(() => {
		const queryParams = new URLSearchParams({
			sortDir: sortDirValue,
			sortBy: sortByValue,
			searchValue: searchValue,
			pageNum: currentPage.toString(),
			pageSize: pageSize.toString(),
			filterBy: filterByValue
		}).toString();

		
		getTableData<T>(queryParams, itemType)
			.then(result => {
				setData(result.data);
				setMetaData(result.metaData);
			})
			.catch(error => {
				console.log('Error at fetch:', error);
			});
	}, [searchValue, sortByValue, sortDirValue, filterByValue, currentPage, pageSize, itemType]);

	const handleSort = (sortKey: string) => {
		setSortByValue(sortKey);
		setSortDirValue((prevState) => (prevState === 'asc' ? 'desc' : 'asc'));
		setCurrentPage(1);
	};

	if (data && data.length) {
		Object.keys(data[0]).forEach((key: string, i: number) => {
			skipValues.includes(key) && skipIndexes.push(i);
		});
	}

	return !data ? (
		<div className='loading-wrapper full-page'>
			<Loader color='orange' type='bars' />
		</div>
	) : (
		<>
			<Toolbar>
				<Searchbar searchValue={searchValue} setSearchValue={setSearchValue} setCurrentPage={setCurrentPage} />
				{isFilterable && (
					<Filter
						filterValue={filterByValue}
						setFilterValue={setFilterByValue}
						setCurrentPage={setCurrentPage}
						itemType={itemType}
					/>
				)}
				<PageSize setPageSize={setPageSize} pageSize={pageSize} setCurrentPage={setCurrentPage} />
			</Toolbar>

			{!data.length ? (
				<h2>Ingen data fundet</h2>
			) : (
				<table>
					<thead>
						<tr>
							{Object.keys(data[0]).map((key: string, i: number) =>
								skipIndexes.includes(i) ? null : (
									<TableHeaderColumn
										key={key}
										title={key}
										handleSort={handleSort}
										itemType={itemType as keyof typeof dictionaries}
										sortByValue={sortByValue}
										sortDirValue={sortDirValue}
									/>
								),
							)}
						</tr>
					</thead>
					<tbody>
						{data.map((item: T, index: number) => (
							<TableBodyRow<typeof item> key={index} item={item} skipIndexes={skipIndexes} />
						))}
					</tbody>
				</table>
			)}

			<div>
				<ReactPaginate {...paginationSettings} />
			</div>
		</>
	);
}
