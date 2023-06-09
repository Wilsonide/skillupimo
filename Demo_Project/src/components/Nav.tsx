type PropsType = {
    viewCart :boolean,
    setViewCart:React.Dispatch<React.SetStateAction<boolean>>
}

function Nav({viewCart, setViewCart}:PropsType) {
  const button = viewCart ? <button onClick={() => setViewCart(false)}>Back to products</button> : <button onClick={() => setViewCart(true)}>View Cart</button>

    const content = (
        <nav className="nav">
            {button}
        </nav>
    )
  return content
}

export default Nav