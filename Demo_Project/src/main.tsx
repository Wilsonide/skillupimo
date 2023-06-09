import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {ProductsProvider} from './context/productsProvider'
import {CartProvider} from './context/cartProvider'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <CartProvider>
      <ProductsProvider>
        <App />
      </ProductsProvider>
    </CartProvider>
  </React.StrictMode>,
)
