import { AppProps } from "next/app";
import { globalStyles } from "../src/styles/globlal";
import logoImg from '../src/assets/logo.svg';
import Image from "next/image";
import { Container, Header } from "../src/styles/pages/app";
globalStyles();

export default function App({ Component, pageProps }: AppProps) {

  return (
    <Container>
      <Header>
        <Image src={logoImg}
          alt="logo"
          width={129}
          height={52}
        />
      </Header>
      <Component {...pageProps} />
    </Container>

  )
}