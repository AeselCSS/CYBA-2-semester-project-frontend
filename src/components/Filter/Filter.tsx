import React from "react";
import { filterDictionary } from '../Table/danishDictionary.ts';

interface Props {
    filterValue: string,
    setFilterValue: (newValue: string) => void;
    itemType: string
    setCurrentPage: (newValue: number) => void;
}


export default function Filter({filterValue, setFilterValue, itemType, setCurrentPage}: Props) {

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setFilterValue(event.target.value)
        setCurrentPage(1);
    }

    return (
        <>
            <label htmlFor="filter">Filter: </label>
            <select name="filter" id="filter" value={filterValue} onChange={handleChange}>
                <option value="">Ingen</option>
                {Object.keys(filterDictionary[itemType]).map((key) => (
                    //@ts-ignore
                    <option key={key} value={key}>{filterDictionary[itemType][key]}</option>
                ))}
            </select>
        </>
    )
}
