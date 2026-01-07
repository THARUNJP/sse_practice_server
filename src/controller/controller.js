const clients = new Map(); // to keep track of each clients
export async function SSE(req, res) {
  //set header to keep connection alive
  res.setHeader("Content-type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  // res.write(`data: Connected to server\n\n`);

  let count = 0;
  const IntervalId = setInterval(() => {
    res.write(`event: counter\n`);
    res.write(`data: ${JSON.stringify({ count })}\n\n`);
    count++;
  }, 2000);

  // this writes to all connected clients

  req.on("close", () => {
    clearInterval(IntervalId);
    res.end();
  });
}
