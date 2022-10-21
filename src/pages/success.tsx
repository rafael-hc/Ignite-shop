import { GetServerSideProps } from 'next'
import Image from 'next/future/image'
import Head from 'next/head'
import Link from 'next/link'
import { useEffect } from 'react'
import Stripe from 'stripe'
import { useShoppingCart } from 'use-shopping-cart'
import { stripe } from '../lib/stripe'
import {
  ImageContainer,
  Images,
  SuccessContainer,
} from '../styles/pages/success'

interface SuccessProps {
  customerName: string
  products: {
    name: string
    imageUrl: string
  }[]
}

export default function Success({ customerName, products }: SuccessProps) {
  const { clearCart } = useShoppingCart()

  useEffect(() => {
    clearCart()
  }, [clearCart])

  return (
    <>
      <Head>
        <title>Compra efetuada! | Ignite Shop</title>
        <meta name="robots" content="noindex" />
      </Head>
      <SuccessContainer>
        <h1>Compra efetuada!</h1>
        <Images>
          {products.map((product) => (
            <ImageContainer key={product.imageUrl}>
              <Image src={product.imageUrl} alt="" width={120} height={110} />
            </ImageContainer>
          ))}
        </Images>
        <p>
          Uhuul <strong>{customerName}</strong>, sua compra de{' '}
          {` ${products.length} `}camisetas já está a caminho da sua casa.{' '}
        </p>

        <a href="/">Voltar ao catálogo</a>
      </SuccessContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  const sessionId = String(query.session_id)
  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product'],
  })

  const customerName = session.customer_details.name
  const productsStripe = session.line_items.data.map<Stripe.Product>(
    (item) => item.price.product as Stripe.Product,
  )

  const products = productsStripe.map((product) => {
    return { name: product.name, imageUrl: product.images[0] }
  })

  return {
    props: {
      customerName,
      products,
    },
  }
}
