import Image from 'next/future/image'
import {
    useShoppingCart,
    formatCurrencyString
} from 'use-shopping-cart'
import {
    Product,
    CartActions,
    CartEntry as ICartEntry
} from 'use-shopping-cart/core'

function CartEntry({
    entry,
    removeItem
}: {
    entry: ICartEntry
    removeItem: CartActions['removeItem']
}) {
    return (
        <div>
            <h3>{entry.name}</h3>
            {entry.image ? (
                <Image width={100} height={100} src={entry.image} alt={entry.description} />
            ) : null}
            <p>
                {entry.quantity} x{' '}
                {formatCurrencyString({ value: entry.price, currency: 'BRL' })} ={' '}
                {entry.formattedValue}
            </p>
            <button onClick={() => removeItem(entry.id)}>Remove</button>
        </div>
    )
}

function Cart() {
    const cart = useShoppingCart()
    const { removeItem, cartDetails, clearCart, formattedTotalPrice } = cart

    const cartEntries = Object.values(cartDetails ?? {}).map((entry) => (
        <CartEntry key={entry.id} entry={entry} removeItem={removeItem} />
    ))

    return (
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
    )
}

const products: Product[] = [
    {
        name: 'Sunglasses',
        id: 'price_1GwzfVCNNrtKkPVCh2MVxRkO',
        price: 1500,
        image: 'https://files.stripe.com/links/fl_test_FR8EZTS7UDXE0uljMfT7hwmH',
        currency: 'BRL',
        description: 'A pair of average black sunglasses.'
    },
    {
        name: '3 Stripe Streak Scoop Neck Flowy T-Shirt',
        id: 'price_OkRxVM2hCVPkKtrNNCVfzwG1',
        price: 3000,
        image:
            'https://static.musictoday.com/store/bands/4806/product_600/5QCTBL052.jpg',
        description:
            'A black scoop neck flowy t-shirt with 3 bright yellow strips behind the words Black Lives Matter.',
        currency: 'BRL'
    }
]

function ProductListing({
    product,
    addItem
}: {
    product: Product
    addItem: CartActions['addItem']
}) {
    return (
        <div key={product.id}>
            <h3>{product.name}</h3>
                {product.image ? (
                    <Image width={300} height="400"  src={product.image} alt={product.description} style={{objectFit: 'cover'}}/>
                ) : null}
            <p>{formatCurrencyString({ value: product.price, currency: 'BRL' })}</p>
            <button
                onClick={() => addItem(product)}
                aria-label={`Add one ${product.name} to your cart.`}
            >
                Add 1 to Cart
            </button>
        </div>
    )
}

function ProductList() {
    const cart = useShoppingCart()
    const { addItem, incrementItem } = cart

    return (
        <div>
            <h2>Products</h2>
            {products.map((product) => (
                <>
                    <ProductListing key={product.id} product={product} addItem={addItem} />
                    <button onClick={() => incrementItem(product.id,)}>Incrementar</button>
                </>
            ))}
        </div>
    )
}

function App() {
    return (
        <div style={{ display: 'grid', placeItems: 'center' }}>
            <h1>Grocery+ Store</h1>
            <ProductList />
            <br />
            <hr
                style={{
                    background: 'grey',
                    height: 1,
                    width: '100%',
                    maxWidth: '20rem'
                }}
            />
            <Cart />
          
        </div>
    )
}

export default App