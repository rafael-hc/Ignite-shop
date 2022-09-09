import { AppProps } from "next/app"
import { globalStyles } from "../styles/global"
import { Container, Header } from "../styles/pages/app"
import logoImg from '../assets/logo.svg'
import Image from "next/future/image"


export default function App({ Component, pageProps }: AppProps) {
  globalStyles()
  return (
    <Container>
      <Header>
        <Image src={logoImg} alt="home" />
      </Header>
      <Component {...pageProps} />
    </Container>
  )
}


