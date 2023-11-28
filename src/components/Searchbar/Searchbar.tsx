import {CiSearch} from "react-icons/ci"


interface Props {
    searchValue: string,
    setSearchValue: (newSearchValue: string) => void;
	setCurrentPage: (newValue: number) => void;
}


export default function Searchbar({searchValue, setSearchValue, setCurrentPage }: Props) {
	return (
		<>
			<label htmlFor='searchbar'><CiSearch/></label>
			<input id="searchbar" type='text' value={searchValue} onChange={(event) => {
				setCurrentPage(1);
				setSearchValue(event.target.value)
			} } ></input>
		</>
	);
}