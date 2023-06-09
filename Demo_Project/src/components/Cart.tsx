import useCart from "../hooks/UseCart"
import { useState } from "react"
import cartContext from "../context/cartProvider"
import CartLineItem from "./CartLineItem"

const Cart = () => {
  const [confirm, setConfirm] = useState(false)
  const { cart,totalPrice, totalItems, dispatch, REDUCER_ACTION} = useCart()

  const onSubmitOrder = () => {
    dispatch({type: REDUCER_ACTION.SUBMIT})
    setConfirm(true)
  }
  const pageContent = confirm ? 
  <h2>
    Thank you for your order!
  </h2> :
  <>
   <h2 className="offscreen">cart</h2>
   <ul className="cart">
      {cart.map((item) => {
        return(
          <CartLineItem key={item.sku} item={item} dispatch={dispatch} REDUCER_ACTION={REDUCER_ACTION}/>
        )
      })}
   </ul>
   <div className="cart__totals">
      <p>Total Items: {totalItems}</p>
      <p>Total Price: {totalPrice}</p>
      <button onClick={onSubmitOrder} disabled={!totalItems}>Place Order</button>
   </div>
  </>

  const content = <main className="main main--cart">
    {pageContent}
  </main>


  return content
}

export default Cart