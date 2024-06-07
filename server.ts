import * as deepl from "deepl-node";

const authKey = "...";
const translator = new deepl.Translator(authKey);

const server = Bun.serve({
  port: 3000,
  fetch: async (req) => {
    const headers = {
      "Access-Control-Allow-Origin": "http://localhost:5173",
      "Access-Control-Allow-Methods": "POST",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    if (req.method === "OPTIONS") {
      return new Response(null, { headers });
    }

    if (req.method !== "POST") {
      return new Response("Only POST requests are allowed", {
        status: 405,
        headers,
      });
    }

    try {
      const body = await req.json();
      const { text, target_lang } = body;

      if (!text || !target_lang) {
        return new Response(
          'Missing "text" or "target_lang" in the request body',
          { status: 400, headers }
        );
      }

      const result = await translator.translateText(text, null, target_lang);
      const translatedText = Array.isArray(result)
        ? result[0].text
        : result.text;

      return new Response(JSON.stringify({ translatedText }), {
        headers: { "Content-Type": "application/json", ...headers },
      });
    } catch (error) {
      return new Response("Error translating text: " + error.message, {
        status: 500,
        headers,
      });
    }
  },
});

console.log("Server running on http://localhost:3000");
