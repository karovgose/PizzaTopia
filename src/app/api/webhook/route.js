const stripe = require('stripe')(process.env.STRIPE_SK);
import { Order } from '@/app/models/Orders';
import { buffer } from 'micro';
export async function POST(req) {
  const sig = req.headers.get('stripe-signature');
  let event;

  try {
    const reqBuffer = await req.text();
    const signSecret = process.env.STRIPE_SIGN_SECRET;
    event = stripe.webhooks.constructEvent(reqBuffer, sig, signSecret);
  } catch (e) {
    console.error('stripe error');
   
    return Response.json(e, { status: 400 });
  }
  const orderId = event?.data?.object?.metadata?.orderId;
  const isPaid = event?.data?.object?.paid;

  if (isPaid) {
    await Order.updateOne({ _id: orderId }, { paid: true });
  }

  return Response.json('ok', { status: 200 });
}
