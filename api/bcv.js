export default async function handler(req, res) {
  try {
    const response = await fetch("https://bcv-service.vercel.app/bcv.json");

    const data = await response.json();

    const rawRate = data.USD;

    if (!rawRate) {
      return res.status(500).json({
        error: "No se pudo obtener la tasa desde bcv.json"
      });
    }

    const rate = parseFloat(rawRate.replace(",", "."));

    res.status(200).json({
      source: "BCV (extraído del HTML oficial)",
      rate,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la tasa" });
  }
}
