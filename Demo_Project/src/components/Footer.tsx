import useCart from "../hooks/UseCart"

type FooterProps = {viewCart:boolean}

const Footer = ({viewCart}:FooterProps) => {
  const {totalItems, totalPrice} = useCart()

  const year:number = new Date().getFullYear()

  const pageContent = viewCart ? <p>Shopping Cart &copy; {year}</p>
  : (
    <>
      <p>Total Item: {totalItems}</p>
      <p>Total price: {totalPrice}</p>
      <p>Shopping Cart &copy; {year}</p>
    </>
  )

  const content = (
    <footer className="footer">
      {pageContent}
    </footer>
  )
  return content
}

export default Footer