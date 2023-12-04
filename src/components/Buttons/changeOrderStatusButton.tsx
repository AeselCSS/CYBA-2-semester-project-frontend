interface props {
    btnText: string
    onClick: ()=>void
}

export default function changeOrderStatusButton({btnText, onClick}: props) {
  return (
    <button onClick={onClick}>{btnText}</button>
  )
}
