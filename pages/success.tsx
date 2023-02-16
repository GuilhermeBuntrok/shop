import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Stripe } from 'stripe'
import { stripe } from '../src/lib/stripe'
import { ImageContainer, ImagesContainer, SuccessContainer as SuccessContainer } from '../src/styles/pages/success'

interface SuccessProps {
  customerName: string,
  productsImages: string[]
}

export default function Success({ customerName, productsImages }: SuccessProps) {
  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>
        <meta name="robots" content="noindex" />
      </Head>
      <SuccessContainer>
        <h1>Compra efetuada!</h1>

        <ImagesContainer>
          {productsImages.map((image, i) => (
            <ImageContainer key={i}>
              <Image
                src={image}
                width={120}
                height={110}
                alt="" />
            </ImageContainer>

          ))}
        </ImagesContainer>

        <p>
          Uhuul <strong>{customerName}</strong>, sua compra de {" "}
          {productsImages.length} camisetas ja esta a caminho
        </p>

        <Link href='/'>
          Voltar ao catálogo
        </Link>

      </SuccessContainer>
    </>
  )

}

export const getServerSideProps: GetServerSideProps = async ({ query, params }) => {
  const sessionId = String(query.session_id)

  if (!query.sessionId) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product']
  })

  const customerName = session.customer_details?.name;

  const productsImages = session.line_items?.data.map(item => {
    const product = item!.price!.product as Stripe.Product
    return product.images[0]
  })

  return {
    props: {
      customerName,
      productsImages,


    }
  }
}
