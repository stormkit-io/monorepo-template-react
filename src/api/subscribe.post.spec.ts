import * as http from "node:http";
import { Socket } from "node:net";
import app from "./subscribe.post";

describe("POST /api/subscriber", () => {
  let request: http.IncomingMessage;
  let response: http.ServerResponse;
  let writeSpy: jest.SpyInstance;
  let writeHeadSpy: jest.SpyInstance;

  beforeEach(() => {
    request = new http.IncomingMessage(new Socket());
    response = new http.ServerResponse(request);
    request.method = "POST";

    writeHeadSpy = jest.spyOn(response, "writeHead");
    writeSpy = jest.spyOn(response, "write");
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("returns the correct payload", async () => {
    const wait = app(request, response);

    request.emit("data", JSON.stringify({ test: true }));
    request.emit("end");

    await wait;

    expect(writeSpy).toHaveBeenCalledWith(
      JSON.stringify({ payload: { test: true } })
    );

    expect(writeHeadSpy).toHaveBeenCalledWith(200, "Success");
  });
});
