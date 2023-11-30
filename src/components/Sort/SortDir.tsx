
interface Props {
    sortDirValue: string,
    setSortDirValue: (newValue: string) => void;
}


export default function SortDir({sortDirValue, setSortDirValue}: Props) {


    return (
        <div>
            <label htmlFor="sortDir">Sort by: </label>
            <select value={sortDirValue} onChange={(event) => setSortDirValue(event.target.value)} name="sortDir" id="sortDir">
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
            </select>
        </div>
    )
}