// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { IProduct } from '../../src/Components/context/CartContext';
import { stripe } from '../../src/lib/stripe'



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { products } = req.body as { products: IProduct[] };

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  if (!products) {
    return res.status(404).json({ error: 'products not found' })
  }

  const successUrl = `https://shop-blush-seven.vercel.app/success?session_id={CHECKOUT_SESSION_ID}`;
  const cancelUrl = `https://shop-blush-seven.vercel.app/`;

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: successUrl,
    cancel_url: cancelUrl,
    mode: 'payment',
    line_items: products.map(product => ({
      price: product.defaultPriceId,
      quantity: 1,
    }))

    ,

  })
  return res.status(201).json({
    checkoutUrl: checkoutSession.url,
  })
}
