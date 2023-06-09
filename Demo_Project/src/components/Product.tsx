import {ProductType} from '../context/productsProvider'
import {ReducerAction,ReducerActionType} from '../context/cartProvider'
import { ReactElement } from 'react'

type ProductProps = {
    product: ProductType,
    REDUCER_ACTION: ReducerActionType,
    dispatch: React.Dispatch<ReducerAction>,
    inCart: boolean
}

function Product({product, REDUCER_ACTION, dispatch, inCart}:ProductProps):ReactElement {

    const img : string = new URL(`../images/${product.sku}.jpg`,import.meta.url).href

    const handleAddToCart = () => dispatch({type: REDUCER_ACTION.ADD, payload: {...product,quantity: 1}})

    const itemInCart = inCart ? '→ item in cart: ✅':null

    const content = 
    <article className='product'>
        <h3>{product.name}</h3>
        <img src={img} alt={product.name}/>
        <p>{new Intl.NumberFormat('en-us',{style:'currency',currency:'USD'}).format(product.price)} {itemInCart}</p>
        <button onClick={handleAddToCart}>Add to cart</button>
    </article>
  return content
}

export default Product