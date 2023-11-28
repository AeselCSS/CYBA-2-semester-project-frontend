import React from "react";

interface Props {
    filterValue: string,
    setFilterValue: (newValue: string) => void;
    filterByOpts: string[]
    setCurrentPage: (newValue: number) => void;
}


export default function Filter({filterValue, setFilterValue, filterByOpts, setCurrentPage}: Props) {

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setFilterValue(event.target.value)
        setCurrentPage(1);
    }


    return (
        <>
            <label htmlFor="filter">Filter by: </label>
            <select name="filter" id="filter" value={filterValue} onChange={handleChange}>
                <option value="">None</option>
                {filterByOpts.map((filterOpt) => (
                    <option key={filterOpt} value={filterOpt}>{filterOpt}</option>
                ))}
            </select>
        </>
    )
}