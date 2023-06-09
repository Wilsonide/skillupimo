import Nav from './Nav';
import useCart from '../hooks/UseCart';

type PropsType = {
  viewCart :boolean,
  setViewCart:React.Dispatch<React.SetStateAction<boolean>>
}

function Header({ viewCart, setViewCart }:PropsType) {
  const {totalItems, totalPrice} = useCart()
  const content = (
    <header className='header'>
      <div className='header__title-bar'>
        <h1>SHOPPING CART</h1>
        <div className='header__price-box'>
          <p>Total Item: {totalItems}</p>
          <p>Total price: {totalPrice}</p>
        </div>
      </div>
      <Nav viewCart={viewCart} setViewCart={setViewCart}/>
    </header>
  )
  return content;
}

export default Header