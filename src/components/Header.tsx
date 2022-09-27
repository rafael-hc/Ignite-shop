import Image from "next/future/image"
import logoImg from '../assets/logo.svg'
import { BagLink, HeaderContainer } from "../styles/components/header"
import { useShoppingCart } from "use-shopping-cart"
import { Handbag } from "phosphor-react"



export const Header = () => {
  const { cartCount } = useShoppingCart()

  return (
    <HeaderContainer>
      <Image src={logoImg} alt="home" />
      <BagLink href="/cart">
        <Handbag size={24} weight="bold" />
        {cartCount ? <span>{cartCount}</span> : ""}
      </BagLink>
    </HeaderContainer>
  )
}