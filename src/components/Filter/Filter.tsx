import React from "react";

interface Props {
    filterValue: string,
    setFilterValue: (newValue: string) => void;
    filterByOpts: any
    setCurrentPage: (newValue: number) => void;
}


export default function Filter({filterValue, setFilterValue, filterByOpts, setCurrentPage}: Props) {

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setFilterValue(event.target.value)
        setCurrentPage(1);
    }

    return (
        <>
            <label htmlFor="filter">Filter: </label>
            <select name="filter" id="filter" value={filterValue} onChange={handleChange}>
                <option value="">Ingen</option>
                {Object.keys(filterByOpts).map((key) => (
                    <option key={key} value={key}>{filterByOpts[key]}</option>
                ))}
            </select>
        </>
    )
}