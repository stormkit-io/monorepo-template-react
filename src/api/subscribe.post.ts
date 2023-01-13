import http from "node:http";

const readBody = <T>(req: http.IncomingMessage): Promise<T> => {
  return new Promise((resolve, reject) => {
    const data: Buffer[] = [];

    if (req.method?.toUpperCase() === "GET" || !req.method) {
      return resolve({} as T);
    }

    req
      .on("error", (err) => {
        reject(err);
      })
      .on("data", (chunk) => {
        data.push(chunk);
      })
      .on("end", () => {
        const body = Buffer.isBuffer(data) ? Buffer.concat(data) : data;
        const isUrlEncoded =
          req.headers["content-type"] === "application/x-www-form-urlencoded";

        if (isUrlEncoded) {
          return resolve(
            Object.fromEntries(new URLSearchParams(body.toString("utf-8"))) as T
          );
        }

        return resolve(JSON.parse(body.toString("utf-8")));
      });
  });
};

export default async (req: http.IncomingMessage, res: http.ServerResponse) => {
  const body = await readBody(req);
  res.setHeader("Content-Type", "application/json");
  res.writeHead(200, "Success");
  res.write(JSON.stringify({ payload: body }));
  res.end();
};
