import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/future/image'
import { useRouter } from 'next/router'
import Stripe from 'stripe'
import { stripe } from '../../lib/stripe'
import axios from 'axios'
import { ImageContainer, ProductContainer, ProductDetails } from '../../styles/pages/product'
import { useState } from 'react'

interface ProductProps {
    product: {
        id: string
        name: string
        imageUrl: string
        price: string
        description: string
        defaultPriceId: string
    }
}

export default function Product({ product }: ProductProps) {
    const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)
    const { isFallback } = useRouter()

    const handleBuyProduct = async () => {
        try{
            setIsCreatingCheckoutSession(true)

            const response = await axios.post('/api/checkoutSession',{
                priceId: product.defaultPriceId
            })

            const { checkoutUrl } = response.data

            window.location.href = checkoutUrl

        }catch (err) {
            setIsCreatingCheckoutSession(false)

        }
            
    
    }

    if(isFallback){
        return(<p>Loading...</p>)
    }
    return (
        <ProductContainer>
            <ImageContainer>
                <Image src={product.imageUrl} alt="" width={520} height={480} />
            </ImageContainer>
            <ProductDetails>
                <h1>{product.name}</h1>
                <span>{product.price}</span>
                <p>{product.description}</p>
                <button disabled={isCreatingCheckoutSession} onClick={handleBuyProduct}>Comprar</button>
            </ProductDetails>
        </ProductContainer>
    )
}


export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [
            {params: { id: 'prod_MTCdzYGZWxjsjl'}}
        ],
        fallback: true,
    }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
    const productID = params.id

    const product = await stripe.products.retrieve(productID, {
        expand: ['default_price'],
    })

    const price = product.default_price as Stripe.Price


    return {
        props: {
            product: {
                id: product.id,
                name: product.name,
                imageUrl: product.images[0],
                description: product.description,
                price: new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                }).format(price.unit_amount / 100),
                defaultPriceId: price.id,
            }
        },
        revalidate: 60 * 60 * 1 //1 hora
    }
}