import useCart from "../hooks/UseCart"
import useProducts from "../hooks/UseProducts"
import { ReactElement } from "react"
import Product from "./Product"

function ProductsLists() {

  const {dispatch,REDUCER_ACTION,cart} = useCart()
  const {products} = useProducts()

  let pageContent:ReactElement|ReactElement[] = <p>Loading...</p>

  if (products?.length) {
    pageContent = products.map((product) => {
      const inCart:boolean = cart.some((item) => item.sku === product.sku)
      return(
        <Product key={product.sku} dispatch={dispatch} product={product} REDUCER_ACTION={REDUCER_ACTION} inCart={inCart}/>
      )
    })
  }

  const content = (
    <main className="main main--products">
      {pageContent}

    </main>
  )

  return content
}

export default ProductsLists