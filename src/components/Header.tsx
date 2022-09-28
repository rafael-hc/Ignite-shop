import Image from 'next/future/image'
import logoImg from '../assets/logo.svg'
import { BagLink, HeaderContainer } from '../styles/components/header'
import { useShoppingCart } from 'use-shopping-cart'
import { Handbag } from 'phosphor-react'
import Link from 'next/link'
import * as Popover from '@radix-ui/react-popover'
import { CartModal } from './CartModal'

export const Header = () => {
  const { cartCount } = useShoppingCart()

  return (
    <HeaderContainer>
      <Link href="/">
        <Image src={logoImg} alt="home" />
      </Link>
      <Popover.Root>
        <Popover.Trigger asChild>
          <BagLink empty={!cartCount}>
            <Handbag size={24} weight="bold" />
            {cartCount ? <span>{cartCount}</span> : ''}
          </BagLink>
        </Popover.Trigger>
        <CartModal />
      </Popover.Root>
    </HeaderContainer>
  )
}
