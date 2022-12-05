import { HomeContainer, Product } from "../src/styles/pages/home";

import { useKeenSlider } from 'keen-slider/react'

import camiseta1 from '../src/assets/1.png'
import camiseta2 from '../src/assets/2.png'
import camiseta3 from '../src/assets/3.png'
import Image from "next/image";

import 'keen-slider/keen-slider.min.css';

export default function Home() {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    }
  })

  return (
    <HomeContainer ref={sliderRef} className="keen-slider">
      <Product className="keen-slider__slide">
        <Image src={camiseta1} width={520} height={480} alt="" />

        <footer>
          <strong>Camiseta X </strong>
          <span>R$79,90</span>
        </footer>
      </Product>
      <Product className="keen-slider__slide">
        <Image src={camiseta2} width={520} height={480} alt="" />

        <footer>
          <strong>Camiseta Y </strong>
          <span>R$79,90</span>
        </footer>
      </Product>
      <Product className="keen-slider__slide">
        <Image src={camiseta3} width={520} height={480} alt="" />

        <footer>
          <strong>Camiseta Z</strong>
          <span>R$79,90</span>
        </footer>
      </Product>
      <Product className="keen-slider__slide">
        <Image src={camiseta3} width={520} height={480} alt="" />

        <footer>
          <strong>Camiseta Z</strong>
          <span>R$79,90</span>
        </footer>
      </Product>
    </HomeContainer>
  )
}


