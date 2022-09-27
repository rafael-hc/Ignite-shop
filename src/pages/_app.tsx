import { AppProps } from "next/app"
import { globalStyles } from "../styles/global"
import { Container } from "../styles/pages/app"

import { CartProvider, useShoppingCart } from "use-shopping-cart"
import { Header } from "../components/Header"


export default function App({ Component, pageProps }: AppProps) {
  globalStyles()
  return (
    <CartProvider
      cartMode="checkout-session"
      stripe={process.env.STRIPE_SECRET_KEY}
      currency="BRL"  
      loading={<p>Loading cart...</p>}  
    >
      <Container>
      <Header />
      <Component {...pageProps} />
    </Container>
    </CartProvider>
  )
}


