import Image from 'next/future/image'
import { useShoppingCart, formatCurrencyString } from 'use-shopping-cart'

function App() {
  const cart = useShoppingCart()
  const { removeItem, cartDetails, clearCart, formattedTotalPrice } = cart

  const cartEntries = Object.values(cartDetails ?? {}).map((entry) => (
    <div key={entry.id}>
      <h3>{entry.name}</h3>
      {entry.image ? (
        <Image
          width={100}
          height={100}
          src={entry.image}
          alt={entry.description}
        />
      ) : null}
      <p>
        {entry.quantity} x{' '}
        {formatCurrencyString({ value: entry.price, currency: 'BRL' })} ={' '}
        {entry.formattedValue}
      </p>
      <button onClick={() => removeItem(entry.id)}>Remove</button>
    </div>
  ))
  return (
    <div style={{ display: 'grid', placeItems: 'center' }}>
      <h1>Grocery+ Store</h1>
      <br />
      <hr
        style={{
          background: 'grey',
          height: 1,
          width: '100%',
          maxWidth: '20rem',
        }}
      />
      <div>
        <h2>Cart</h2>
        <p>Total: {formattedTotalPrice}</p>
        {cartEntries.length === 0 ? <p>Cart is empty.</p> : null}
        {cartEntries.length > 0 ? (
          <>
            <button onClick={() => clearCart()}>Clear cart</button>
            {cartEntries}
          </>
        ) : null}
      </div>
    </div>
  )
}

export default App
