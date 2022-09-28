import { stripe } from '../lib/stripe'
import { GetStaticProps } from 'next'
import Stripe from 'stripe'
import Image from 'next/future/image'
import { useKeenSlider } from 'keen-slider/react'

import { HomeContainer, Product } from '../styles/pages/home'
import 'keen-slider/keen-slider.min.css'
import Link from 'next/link'
import Head from 'next/head'
import { useState } from 'react'
import { Arrow } from '../components/Arrow'

interface HomeProps {
  products: {
    id: string
    name: string
    imageUrl: string
    price: string
  }[]
}

export default function Home({ products }: HomeProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    slides: {
      perView: 'auto',
      spacing: 48,
    },
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    },
  })

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>
      <HomeContainer>
        <div ref={sliderRef} className="keen-slider">
          {products.map((product) => {
            return (
              <Link key={product.id} href={`/product/${product.id}`}>
                <Product className="keen-slider__slide">
                  <Image
                    src={product.imageUrl}
                    alt=""
                    width={520}
                    height={480}
                  />
                  <footer>
                    <strong>{product.name}</strong>
                    <span>{product.price}</span>
                  </footer>
                </Product>
              </Link>
            )
          })}
          {loaded && instanceRef.current && (
            <>
              <Arrow
                left
                onClick={(e: any) =>
                  e.stopPropagation() || instanceRef.current?.prev()
                }
                disabled={currentSlide === 0}
              />
              <Arrow
                onClick={(e: any) =>
                  e.stopPropagation() || instanceRef.current?.next()
                }
                disabled={
                  currentSlide ===
                  instanceRef.current.track.details.slides.length - 1
                }
              />
            </>
          )}
        </div>
      </HomeContainer>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price'],
  })

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(price.unit_amount / 100),
    }
  })

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2,
  }
}
