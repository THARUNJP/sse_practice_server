export async function SSE(req, res) {
  //set header to keep connection alive

  res.setHeaders("Content-type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
}
