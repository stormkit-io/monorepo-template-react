import type { IncomingMessage, ServerResponse } from "node:http";

export default (_: IncomingMessage, res: ServerResponse) => {
  res.setHeader("Content-Type", "application/json");
  res.writeHead(200, "Success");
  res.write(JSON.stringify({ status: "running" }));
  res.end();
};
