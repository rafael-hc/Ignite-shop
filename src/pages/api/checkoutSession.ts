import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "../../lib/stripe";

export default async function handle (req: NextApiRequest, res: NextApiResponse) {
    const priceId = req.body.priceId

    if(req.method !== 'POST'){
        return res.status(405).json({ error: 'Method not allowed.'})
    }

    if (!priceId){
        return res.status(400).send({error: 'Price not found.'})
    }

    const success_url = `${process.env.NEXT_URL}/success`
    const cancel_url = `${process.env.NEXT_URL}/`

    const checkoutSession = await stripe.checkout.sessions.create({
        cancel_url,
        success_url,
        mode: 'payment',
        line_items:[
            {
                price: priceId,
                quantity: 1,
                adjustable_quantity: {
                    enabled: true,
                    minimum: 1,
                    maximum: 10,
                }
            },
        ]

    })

    return res.status(201).json({checkoutUrl: checkoutSession.url})
}