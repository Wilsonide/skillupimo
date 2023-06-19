import Header from "./components/Header"
import ProductsLists from "./components/ProductsLists"
import { useState } from "react"
import Footer from "./components/Footer"
import Cart from "./components/Cart"

function App() {
  const [viewCart,setViewCart] = useState<boolean>(false)
  const pageContent = viewCart?<Cart/>:<ProductsLists/>

  const content = (
  <>
    <Header setViewCart={setViewCart} viewCart={viewCart}/>
    {pageContent}
    <Footer viewCart={viewCart}/>
  </>)

  return content
}

export default App
