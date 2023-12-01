import {ReactNode} from "react";

interface Props  {
    children: ReactNode
}

//Den får SortWrapper, Searchbar, Filter

export default function Toolbar({children}: Props) {

    return(
        <div className="toolbar">
            {children}
        </div>
    )
}