
interface Props {
    item: any
}


export default function TableBodyRow({item}: Props) {


    return (
        <>
            <tr>
                {Object.values(item).map((value, i) => (

                    //TODO: Der skal laves en generic type, således at "value" ikke giver en fejl
                    //@ts-ignore
                    <td style={{paddingLeft: "30px"}} key={item.id + i}>{value}</td>
                )) }
            </tr>
        </>
    )
}