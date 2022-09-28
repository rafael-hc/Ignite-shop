/* eslint-disable camelcase */
import { NextApiRequest, NextApiResponse } from 'next'
import { stripe } from '../../lib/stripe'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const line_items = req.body.lineItems

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed.' })
  }

  if (line_items.length === 0) {
    return res.status(400).send({ error: 'Price not found.' })
  }

  const success_url = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`
  const cancel_url = `${process.env.NEXT_URL}/`

  const checkoutSession = await stripe.checkout.sessions.create({
    cancel_url,
    success_url,
    mode: 'payment',
    line_items,
  })

  return res.status(201).json({ checkoutUrl: checkoutSession.url })
}
