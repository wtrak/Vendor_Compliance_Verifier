export default async function handler(req, res) {
  const { targetUrl } = req.query;

  if (!targetUrl || !targetUrl.startsWith("http")) {
    return res.status(400).json({ error: "Invalid or missing targetUrl" });
  }

  try {
    const response = await fetch(targetUrl, { method: "HEAD" });

    return res.status(response.status).json({
      ok: response.ok,
      status: response.status,
      redirected: response.redirected
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
