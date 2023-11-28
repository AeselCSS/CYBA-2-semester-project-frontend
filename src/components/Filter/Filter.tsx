
interface Props {
    filterValue: string,
    setFilterValue: (newValue: string) => void;
    filterByOpts: string[]
}


export default function Filter({filterValue, setFilterValue, filterByOpts}: Props) {


    return (
        <>
            <label htmlFor="filter">Filter by: </label>
            <select name="filter" id="filter" value={filterValue} onChange={(event) => setFilterValue(event.target.value)}>
                <option value="">None</option>
                {filterByOpts.map((filterOpt) => (
                    <option value={filterOpt}>{filterOpt}</option>
                ))}
            </select>
        </>
    )
}