
interface Props {
    sortByValue: string,
    setSortByValue: (newValue: string) => void;
    sortByOpts: string[];
}

export default function SortBy({sortByValue, setSortByValue, sortByOpts}: Props) {

    return (
        <div>
            <label htmlFor="sortBy">Sort by: </label>
            <select name="sortBy" id="sortBy" value={sortByValue} onChange={(event) => setSortByValue(event.target.value)}>
                {sortByOpts.map((sortOption) => (
                    <option value={sortOption}>{sortOption}</option>
                ))}
            </select>
        </div>
    )
}