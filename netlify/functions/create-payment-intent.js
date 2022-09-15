exports.handler = async function (event, context) {
    const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
    const stripe = require('stripe')(STRIPE_SECRET_KEY);

    // Extract payment from body and set to pence for Stripe
    const payment = parseInt((JSON.parse(event.body).toFixed(2)) * 100)

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: payment,
            currency: 'gbp',
            payment_method_types: ['card'],
        });
        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(paymentIntent)
        }
    } catch (err) {
        console.log(err, "create-payment-intent endpoint FAILED!!")
        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: "Payment intent failed: Please try again later."
        }
    }
}
