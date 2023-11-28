import {useEffect, useState} from "react";
import Toolbar from "../Toolbar/Toolbar.tsx";
import Filter from "../Filter/Filter.tsx";
import Searchbar from "../Searchbar/Searchbar.tsx";
import SortWrapper from "../Sort/SortWrapper.tsx";
import TableBodyRow from "./TableBodyRow.tsx";
import ReactPaginate from 'react-paginate';

interface Props {
    itemType: string
    isFilterable?: boolean
    defaultSortBy: string
}


export default function Table({itemType, defaultSortBy, isFilterable = true}: Props) {
    const [data, setData] = useState<any[]>([])
    const [metaData, setMetaData] = useState<any>(null)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [pageSize, setPageSize] = useState<number>(20)
    const [searchValue, setSearchValue] = useState<string>("");
    const [sortByValue, setSortByValue] = useState<string>(defaultSortBy);
    const [sortDirValue, setSortDirValue] = useState<string>("asc");
    const [filterByValue, setFilterByValue] = useState<string>("");


    useEffect(() => {
        //brug itemType og setData() her i fetch
        async function fetchData() {
            const promise = await fetch(`http://localhost:3000/${itemType}s/?sortDir=${sortDirValue}&sortBy=${sortByValue}&searchValue=${searchValue}&pageNum=${currentPage}&pageSize=${pageSize}&filterBy=${filterByValue}`)

            if (promise.ok) {
                const result = await promise.json();
                setData(result.data);
                setMetaData(result.metaData)
            }
        }

        await fetchData()
    }, [searchValue, sortByValue, sortDirValue, filterByValue, currentPage, pageSize])
    //Tif

    const calculcatePageCount = (event) => {
        const pageCount = 
    }


    return (
        <>
            <Toolbar>
                <SortWrapper sortDirValue={sortDirValue} setSortDirValue={setSortDirValue} sortByValue={sortByValue} setSortByValue={setSortByValue} sortByOpts={}/>
                <Searchbar searchValue={searchValue} setSearchValue={setSearchValue}/>
                {isFilterable ?? <Filter filterValue={filterByValue} setFilterValue={setFilterByValue} filterByOpts={}/>}
            </Toolbar>

            <table>
                <thead>
                <tr>
                    {Object.keys(data).map(key => (
                        <th key={key}>{key}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {data.map((index) =>)(
                    <TableBodyRow item={index}/>
                )}
                </tbody>
            </table>
            
            <ReactPaginate pageCount={} onPageChange={(event) => setCurrentPage(event.selected)} pageRangeDisplayed={5} breakLabel="..."  nextLabel="Next" previousLabel="Previous" />
        </>

    )

    //ReactPaginate
}