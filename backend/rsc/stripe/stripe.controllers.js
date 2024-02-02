const stripe = require("stripe")(process.env.STRIPE_CONNECTION_KEY);
const CLIENT_URL = process.env.CLIENT_URL;

//----- create checkoute session in stripe

const checkout = async (req, res, err) => {
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: req.body.lineItems,
      mode: "payment",
      billing_address_collection: "required",
      customer_email: req.body.userEmail,
      allow_promotion_codes: true,
      success_url: `${CLIENT_URL}/order-succsess`,
      cancel_url: `${CLIENT_URL}/error`,
    });

    res.status(200).json({ url: session.url, session_id: session.id });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const getOrder = async (req, res, err) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(req.params.id, {
      expand: ["line_items"],
    });

    res.status(200).json(session);
  } catch (error) {
    res.status(400).json(error);
  }
};

// ---- Export the functions for use in other files

module.exports = {
  checkout,
  getOrder,
};
