const stripe = require('stripe')('sk_test_51Ks4z8IartVhFSxqcREd5AsoHfXU3FNyYw6GKM93twFl1mZ5xKRMrQTBEbfiKIMEa8GkEFXLIVXSuZYqJjfKAaxf00puRx7LyT');

export default async function handler(req: any, res: any) {
  if(req.method === 'POST') {
    try {
      const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        line_items: [
          {
            price: 'price_1Ks56gIartVhFSxqPaXrQrsh',
            quantity: 1,
          },
        ],
        
        success_url: `${req.headers.origin}/?success=true`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
      });
      res.redirect(303, session.url)
    } catch (error: any) {
      res.status(error.statusCode || 500).json(error.message);
    }
  } else {

  }
  // res.setHeader('Allow', 'POST');
  //   res.status(405).end('Method Not Allowed');
}
