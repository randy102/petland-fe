import NumberFormat from 'react-number-format'

type Props = {
  price: number
}

export default function Price(props: Props) {
  return (
    <NumberFormat
      decimalScale={0}
      decimalSeparator=","
      displayType="text"
      suffix=" đ"
      thousandSeparator="."
      value={props.price}
    />
  )
}
