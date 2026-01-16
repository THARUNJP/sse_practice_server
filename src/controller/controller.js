const clients = new Map(); // to keep track of each clients
let count = 0;
export async function SSE(req, res) {
  //set header to keep connection alive
  res.setHeader("Content-type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  // res.write(`data: Connected to server\n\n`);

  // const lastId = parseInt(req.headers["last-event-id"], 10) || 0;
  // if (count < lastId) {
  //   count = lastId;
  // }

  const IntervalId = setInterval(() => {
    res.write(`id: ${count}\n`);
    res.write(`event: counter\n`);
    res.write(`data: ${JSON.stringify({ count })}\n\n`);
    count++;
  }, 2000);


  const heartIntervalId = setInterval(() => {
    res.write(`event: heartbeat\n`);
    res.write(`data: alive\n\n`);
  }, 5000);

  // this writes to all connected clients

  req.on("close", () => {
    clearInterval(IntervalId);
    clearInterval(heartIntervalId);
    res.end();
  });
}
