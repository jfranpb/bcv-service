export default async function handler(req, res) {
  try {
    const response = await fetch("https://www.bcv.org.ve/", {
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
    });

    const html = await response.text();

    // TEMPORAL: devolver los primeros 500 caracteres
    return res.status(200).send(html.slice(0, 500));
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la tasa" });
  }
}
