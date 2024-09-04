addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const url = new URL(request.url);

  // Modify the request URL to point to your Azure subdomain
  const targetUrl = `https://edutools.eastus.cloudapp.azure.com${url.pathname}`;

  if (request.method === "OPTIONS") {
    return handleOptions(request);
  }

  try {
    // Forward the request to the target Azure subdomain with HTTPS
    const response = await fetch(targetUrl, {
      method: request.method,
      headers: request.headers,
      body: request.body,
    });

    // Clone the response and modify headers to allow CORS
    const newResponse = new Response(response.body, response);
    newResponse.headers.set("Access-Control-Allow-Origin", "*");
    newResponse.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    newResponse.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
    newResponse.headers.set("Access-Control-Allow-Credentials", "true");

    return newResponse;
  } catch (err) {
    console.error("Fetch error:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}

function handleOptions(request) {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
    "Access-Control-Allow-Credentials": "true",
    "Content-Length": "0",
  };
  return new Response(null, {
    headers: headers,
    status: 204,
  });
}
