import {CiSearch} from "react-icons/ci"


interface Props {
    searchValue: string,
    setSearchValue: (newSearchValue: string) => void;
}


export default function Searchbar({searchValue, setSearchValue}: Props) {
	return (
		<>
			<label htmlFor='searchbar'><CiSearch/></label>
			<input id="searchbar" type='text' value={searchValue} onChange={(event) => setSearchValue(event.target.value) } ></input>
		</>
	);
}