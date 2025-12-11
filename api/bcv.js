export default async function handler(req, res) {
  try {
    const response = await fetch(
      "https://www.bcv.org.ve/sites/default/files/tasas.json"
    );

    const data = await response.json();

    const rawRate = data.USD; // Ej: "36,45"

    if (!rawRate) {
      return res.status(500).json({ error: "No se pudo obtener la tasa" });
    }

    const rate = parseFloat(rawRate.replace(",", "."));

    res.status(200).json({
      source: "BCV",
      rate,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la tasa" });
  }
}
