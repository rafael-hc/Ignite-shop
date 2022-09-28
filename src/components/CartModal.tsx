import { useState } from 'react'
import Image from 'next/future/image'
import { useShoppingCart, formatCurrencyString } from 'use-shopping-cart'
import { X } from 'phosphor-react'
import axios from 'axios'
import {
  BodyCart,
  CartContent,
  CartList,
  FooterCart,
  Item,
  ItemDescription,
  ItemImage,
  PopoverClose,
  PopoverContent,
} from '../styles/components/cartModal'

export const CartModal = () => {
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false)

  const {
    cartDetails,
    formattedTotalPrice,
    cartCount,
    decrementItem,
    incrementItem,
  } = useShoppingCart()

  const cartEntries = Object.values(cartDetails ?? {})

  const handleBuyProduct = async () => {
    const lineItems = cartEntries.map((entry) => {
      return { price: entry.price_id, quantity: entry.quantity }
    })
    try {
      setIsCreatingCheckoutSession(true)

      const response = await axios.post('/api/checkoutSession', {
        lineItems,
      })

      const { checkoutUrl } = response.data

      window.location.href = checkoutUrl
    } catch (err) {
      setIsCreatingCheckoutSession(false)
    }
  }

  return (
    <PopoverContent>
      <PopoverClose>
        <X size={24} />
      </PopoverClose>
      <CartContent>
        <strong>Sacola</strong>

        {cartEntries.length > 0 ? (
          <CartList>
            <BodyCart>
              {Object.values(cartDetails ?? {}).map((entry) => (
                <Item key={entry.id}>
                  {entry.image ? (
                    <ItemImage>
                      <Image
                        width={100}
                        height={100}
                        src={entry.image}
                        alt={entry.description}
                      />
                    </ItemImage>
                  ) : null}
                  <ItemDescription>
                    <p>{entry.name}</p>
                    <strong>
                      {entry.quantity} x{' '}
                      {formatCurrencyString({
                        value: entry.price,
                        currency: entry.currency,
                      })}{' '}
                      = {entry.formattedValue}
                    </strong>
                    <div>
                      <button onClick={() => decrementItem(entry.id)}>
                        Remove
                      </button>
                      <button onClick={() => incrementItem(entry.id)}>
                        Adicionar
                      </button>
                    </div>
                  </ItemDescription>
                </Item>
              ))}
            </BodyCart>
            <FooterCart>
              <p>
                <span>Quantidade</span> <span>{cartCount}</span>
              </p>
              <p>
                <span>Total</span> <span>{formattedTotalPrice}</span>
              </p>
              <button
                onClick={handleBuyProduct}
                disabled={isCreatingCheckoutSession}
              >
                Finalizar compra
              </button>
            </FooterCart>
          </CartList>
        ) : (
          <p>Cart is empty.</p>
        )}
      </CartContent>
    </PopoverContent>
  )
}
