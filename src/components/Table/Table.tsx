import {useEffect, useState} from "react";
import Toolbar from "../Toolbar/Toolbar.tsx";
import Filter from "../Filter/Filter.tsx";
import Searchbar from "../Searchbar/Searchbar.tsx";
import SortWrapper from "../Sort/SortWrapper.tsx";
import TableBodyRow from "./TableBodyRow.tsx";

interface Props {
    itemType: string
    isFilterable: boolean
}



export default function Table({itemType, isFilterable = true}: Props) {
    const [data, setData] = useState<any>(null)
    const [searchValue, setSearchValue] = useState("");
    const [sortByValue, setSortByValue] = useState("");
    const [sortDirValue, setSortDirValue] = useState("asc");
    const [filterByValue, setFilterByValue] = useState("none");


    useEffect(() => {
        //brug itemType og setData() her i fetch

    })




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
                {data.map((index) => )(
                    <TableBodyRow item={index}/>
                )}
                </tbody>
            </table>
        </>

    )

    //ReactPaginate
}