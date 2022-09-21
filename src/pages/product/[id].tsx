import { useRouter } from 'next/router'
import { ImageContainer, ProductContainer, ProductDetails } from '../../styles/pages/product'

export default function Product (){
    const { query } = useRouter()
    return(
        <ProductContainer>
            <ImageContainer>

            </ImageContainer>
            <ProductDetails>
                <h1>Camiseta X</h1>
                <span>R$ 79,90</span>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius eligendi quaerat libero expedita molestias excepturi odio temporibus, maxime a id laudantium distinctio quo, neque aliquid. Numquam perspiciatis eaque esse sit?
                </p>
                <button>Comprar</button>
            </ProductDetails>
        </ProductContainer>
    )
}