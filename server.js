const express = require("express");
const app = express();
// This is your test secret API key.
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

app.use(express.static("public"));
app.use(express.json());


app.post("/create-payment-intent", async (req, res) => {


  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 90000,
      currency: "vnd",
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      automatic_payment_methods: {
        enabled: true,
      },
    });
  
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.log(error);
  }

  // Create a PaymentIntent with the order amount and currency
 
});


app.listen(4242, () => console.log("Node server listening on port 4242!"));