export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Método no permitido"
    });
  }

  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        error: "No se recibió ningún mensaje"
      });
    }

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-5",
        input: message
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: data.error?.message || "Error al comunicarse con la IA"
      });
    }

    return res.status(200).json({
      reply: data.output_text
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Error interno del servidor"
    });
  }
}
