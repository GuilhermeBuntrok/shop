
import { GetStaticPaths, GetStaticProps } from "next"
import Head from "next/head"
import Image from "next/image"
import { useRouter } from "next/router"
import Stripe from "stripe"
import { IProduct } from "../../src/Components/context/CartContext"
import { useCart } from "../../src/hooks/useCart"
import { stripe } from "../../src/lib/stripe"
import { ImageContainer, ProductContainer, ProductDetails } from "../../src/styles/pages/product"

interface ProductProps {
  product: IProduct
}

export default function Product({ product }: ProductProps) {

  const { isFallback } = useRouter()

  const { checkIfItemAlreadyExist, addToCart } = useCart()

  if (isFallback) {
    return <p>Loading...</p>
  }

  const itemAlreadyInCart = checkIfItemAlreadyExist(product.id)

  return (
    <>
      <Head>
        <title>{product.name}</title>
      </Head>
      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} width={520} height={480} alt='' />
        </ImageContainer>

        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.price}</span>

          <p>{product.description}</p>
          <button disabled={itemAlreadyInCart} onClick={() => addToCart(product)}>
            {itemAlreadyInCart ?
              "Produto ja esta no carrinho"
              : "colocar na sacola"}
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { id: 'prod_Mvu04tXwCSC3Vf' } }
    ],
    fallback: "blocking",
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
  const productId = params!.id;

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price']
  })

  const price = product.default_price as Stripe.Price

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(price.unit_amount! / 100),
        numberPrice: price.unit_amount! / 100,
        description: product.description,
        defaultPriceId: price.id,
      }

    },
    revalidate: 60 * 60 * 1
  }
}
