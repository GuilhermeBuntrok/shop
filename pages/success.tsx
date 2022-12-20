import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Stripe } from 'stripe'
import { stripe } from '../src/lib/stripe'
import { ImageContainer, SuccessContainer as SuccessContainer } from '../src/styles/pages/success'

interface SuccessProps {
  customerName: string,
  price: {
    product: {
      name: string;
      imageUrl: string,
    }

  }
}

export default function Success({ customerName, price }: SuccessProps) {
  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>
        <meta name="robots" content="noindex" />
      </Head>
      <SuccessContainer>
        <h1>Compra efetuada!</h1>

        <ImageContainer>
          <Image
            src={price.product.imageUrl}
            width={120}
            height={110}
            alt="" />
        </ImageContainer>


        <p>
          Uhuul <strong>{customerName}</strong>, sua <strong>{price.product.name}</strong> já está a caminho de sua casa.
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

  const product = session.line_items?.data[0].price?.product as Stripe.Product

  return {
    props: {
      customerName,
      price: {
        product: {
          name: product.name,
          imageUrl: product.images[0],

        }
      }


    }
  }
}
