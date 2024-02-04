import { PRIMARY_COLOR } from "../../utils/theme"

export const Button = ({ onClick, text }) => {
  return <button
    onClick={onClick}
    style={{
      borderRadius: '16px',
      borderColor: PRIMARY_COLOR,
      backgroundColor: 'white',
      color: PRIMARY_COLOR,
      padding: '10px',
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      width: '100%'
    }}
  >{text}</button>
}