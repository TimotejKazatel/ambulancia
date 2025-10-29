const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  try {
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" };
    }
    const { items } = JSON.parse(event.body || "{}");
    if (!Array.isArray(items) || !items.length) {
      return { statusCode: 400, body: "No items" };
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: items,
      success_url: `${process.env.URL || "https://example.com"}/cart?status=success`,
      cancel_url: `${process.env.URL || "https://example.com"}/cart?status=cancel`,
      currency: "eur"
    });

    return { statusCode: 200, body: JSON.stringify({ url: session.url }) };
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ error: e.message }) };
  }
};

