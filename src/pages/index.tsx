import Image from "next/future/image";
import { HomeContainer, Product } from "../styles/pages/home";

import shirt1 from "../assets/1.png"
import shirt2 from "../assets/2.png"
import shirt3 from "../assets/3.png"

export default function Home() {
  return (
    <HomeContainer>
      <Product>
        <Image src={shirt1} alt="" width={520} height={480} />
        <footer>
          <strong>Camiseta X</strong>
          <span>R$ 79,90</span>
        </footer>
      </Product>
      <Product>
        <Image src={shirt2} alt="" width={520} height={480} />
        <footer>
          <strong>Camiseta Y</strong>
          <span>R$ 79,90</span>
        </footer>
      </Product>
    </HomeContainer>
  )
}
