import { AppProps } from "next/app";
import { Header } from "../src/Components/Header";
import { CartContextProvider } from "../src/Components/context/CartContext";
import { globalStyles } from "../src/styles/globlal";
import { Container } from "../src/styles/pages/app";

globalStyles();

export default function App({ Component, pageProps }: AppProps) {

  return (
    <CartContextProvider>
      <Container>
        <Header />
        <Component {...pageProps} />
      </Container>
    </CartContextProvider>

  )
}