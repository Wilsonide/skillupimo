import {CartType} from '../context/cartProvider'
import {ReducerAction,ReducerActionType} from '../context/cartProvider'

type CartLineItemProps = {
    item: CartType,
    REDUCER_ACTION: ReducerActionType,
    dispatch: React.Dispatch<ReducerAction>

}

function CartLineItem({item, REDUCER_ACTION, dispatch}:CartLineItemProps) {
  const img : string = new URL(`../images/${item.sku}.jpg`,import.meta.url).href
  const LineTotal: number = item.price * item.quantity
  const highestQuantity: number = 20 > item.quantity ? 20 : item.quantity

  const optionValues = [...Array(highestQuantity).keys()].map((n) => n + 1)

  const options = optionValues.map((n) => <option key={`opt${n}`} value={n}>{n}</option>)

  const onchangeQty = (e:React.ChangeEvent<HTMLSelectElement>) => {
    const quantity = Number(e.target.value)
    dispatch({type: REDUCER_ACTION.QUANTITY, payload: {...item, quantity}})
  }

  const onRemoveFromCart = () => dispatch({type: REDUCER_ACTION.REMOVE, payload: item})

  const content = 
  <li className="cart__item">
    <img src={img} alt={item.name} className='cart__img' />
    <div aria-label='Item Name'>{item.name}</div>
    <div aria-label='Price Per Item'>{new Intl.NumberFormat('en-us',{style:'currency',currency:'USD'}).format(item.price)}</div>

    <label htmlFor="itemQty" className='offscreen'>
        Item Quantity
    </label>
    <select name="itemQty" id="itemQty" value={item.quantity} className='cart__select'
    onChange={onchangeQty} arial-label='Item Quantity'>{options}</select>

    <div aria-label='Line Item Subtotal' className='cart__item-subtotal'>{new Intl.NumberFormat('en-us',{style:'currency',currency:'USD'}).format(LineTotal)}</div>

    <button className='cart__button' aria-label='Remove Item From Cart' onClick={onRemoveFromCart}>❌</button>
  </li>
  return content
}
 
export default CartLineItem