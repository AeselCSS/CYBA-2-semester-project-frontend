
interface Props {
    item: any
}


export default function TableBodyRow({item}: Props) {


    return (
        <>
            <tr>
                {Object.values(item).map((value) => (

                    //TODO: Der skal laves en generic type, således at "value" ikke giver en fejl
                    //@ts-ignore
                    <td key={item.id}>{value}</td>
                )) }
            </tr>
        </>
    )
}