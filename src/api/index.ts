import type { IncomingMessage } from "node:http";

export default (_: IncomingMessage) => {
  return {
    body: { status: "running" },
    status: 200,
  };
};
