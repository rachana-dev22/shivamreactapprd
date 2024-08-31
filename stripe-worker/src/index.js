addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  if (request.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  if (request.method === "POST" && request.url.endsWith("/create-checkout-session")) {
    const { priceId, email } = await request.json();
    const sessionId = generateUniqueSessionId();

    try {
      const response = await fetch("https://api.stripe.com/v1/checkout/sessions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${STRIPE_SECRET_KEY}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          "payment_method_types[]": "card",
          mode: "subscription",
          "line_items[0][price]": priceId,
          "line_items[0][quantity]": "1",
          customer_email: email,
          success_url: `https://edutools.app/success?session_id=${sessionId}`,
          cancel_url: "https://edutools.app/failure",
        }),
      });

      const session = await response.json();

      if (!response.ok) {
        console.error("Stripe API error:", session);
        return new Response(JSON.stringify({ error: session.error.message }), {
          status: 500,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        });
      }

      await storeSessionInDatabase(sessionId, email, "pending");

      return new Response(JSON.stringify({ id: session.id }), {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    } catch (error) {
      console.error("Fetch error:", error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }
  } else {
    return new Response("Not Found", { status: 404, headers: { "Access-Control-Allow-Origin": "*" } });
  }
}

function generateUniqueSessionId() {
  return Math.random().toString(36).substr(2, 9);
}

async function storeSessionInDatabase(sessionId, email, status) {
  await MY_KV_NAMESPACE.put(sessionId, JSON.stringify({ email, status }));
}
