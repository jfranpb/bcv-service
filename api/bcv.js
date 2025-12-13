export default async function handler(req, res) {
  try {
    // Cambia TU_DOMINIO por tu dominio real de Vercel
    const response = await fetch("https://TU_DOMINIO.vercel.app/bcv.json");

    const data = await response.json();

    const rawRate = data.USD; // Ej: "36,45"

    if (!rawRate) {
      return res.status(500).json({ error: "No se pudo obtener la tasa desde bcv.json" });
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
