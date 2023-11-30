import SortDir from "./SortDir.tsx";
import SortBy from "./SortBy.tsx";


interface Props {
    sortDirValue: string,
    setSortDirValue: (newValue: string) => void;
    sortByValue: string,
    setSortByValue: (newValue: string) => void;
    sortByOpts: string[];
}


export default function SortWrapper({sortDirValue, setSortDirValue, sortByValue, setSortByValue, sortByOpts}: Props) {

    return (
        <div>
            <SortBy setSortByValue={setSortByValue} sortByOpts={sortByOpts} sortByValue={sortByValue}/>
            <SortDir setSortDirValue={setSortDirValue} sortDirValue={sortDirValue}/>
        </div>
    )
}