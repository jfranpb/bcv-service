export default async function handler(req, res) {
  try {
    const response = await fetch("https://www.bcv.org.ve/", {
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
    });

    const html = await response.text();

    // Regex más robusto para capturar la tasa
    const match = html.match(/<strong[^>]*>([\d.,]+)<\/strong>/);

    if (!match) {
      return res.status(500).json({ error: "No se pudo obtener la tasa" });
    }

    // Convertir "36,45" → 36.45
    const rate = parseFloat(
      match[1].replace(/\./g, "").replace(",", ".")
    );

    res.status(200).json({
      source: "BCV",
      rate,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la tasa" });
  }
}
