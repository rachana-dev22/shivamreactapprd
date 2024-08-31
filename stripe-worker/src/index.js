addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  if (request.method === "POST" && request.url.endsWith("/create-checkout-session")) {
    const { priceId, email } = await request.json();

    const stripeSecretKey = STRIPE_SECRET_KEY;

    try {
      const response = await fetch("https://api.stripe.com/v1/checkout/sessions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${stripeSecretKey}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          "payment_method_types[]": "card",
          mode: "subscription",
          "line_items[0][price]": priceId,
          "line_items[0][quantity]": "1",
          customer_email: email,
          success_url: "https://edutools.app/success",
          cancel_url: "https://edutools.app/cancel",
        }),
      });

      const session = await response.json();

      return new Response(JSON.stringify({ id: session.id }), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  } else {
    return new Response("Not Found", { status: 404 });
  }
}
