import type { Url, Body, EnqueueParams, Headers, Method, Req, Res } from "../types/APIQueueTypes";

export class APIQueue {
  private queue: QueuedRequest<any>[];

  constructor() {
    this.queue = [];
  }

  private async processQueue(): Promise<void> {
    const results = await Promise.allSettled(this.queue.map(request => request.execute()));

    results.forEach((result) => {
      if (result.status === "rejected") {
        console.error(result.reason);
      }
    });

    this.queue = [];
  }

  public enqueue<U extends Url>({ url, method, reqBody, reqHeaders, callback }: EnqueueParams<U>): void {
    const request = new QueuedRequest<U>({
      url,
      method,
      reqBody,
      reqHeaders,
      callback
    });

    const existingRequest = this.queue.find((queuedRequest) => {
      return (
        queuedRequest.isEqual(request)
      );
    });

    if (existingRequest) return;

    if (this.queue.length === 0) {
      this.queue.push(request);
      this.processQueue();
    } else {
      this.queue.push(request);
    }
  }
}

class QueuedRequest<U extends Url> {
  private url: U;
  private method: Method;
  private reqBody?: Body<U>;
  private reqHeaders?: Headers;
  private callback?: ((response: Res<U>) => void);
  private executed: boolean;

  constructor({
    url,
    method,
    reqBody,
    reqHeaders,
    callback
  }: EnqueueParams<U>) {
    this.url = url;
    this.method = method;
    this.reqBody = reqBody;
    this.reqHeaders = reqHeaders;
    this.callback = callback;
    this.executed = false;
  }

  public isEqual(other: QueuedRequest<U>): boolean {
    return (
      this.url === other.url &&
      this.method === other.method &&
      JSON.stringify(this.reqBody) === JSON.stringify(other.reqBody) &&
      JSON.stringify(this.reqHeaders) === JSON.stringify(other.reqHeaders) &&
      this.callback === other.callback
    );
  }

  public async execute(): Promise<void> {
    if (this.executed) return;

    const req: Req<U> = {
      method: this.method,
      headers: {
        Authorization: process.env["AUTHORIZATION_KEY"]!,
        "Content-Type": "application/json",
        ...this.reqHeaders
      }
    };

    if (this.reqBody) req["body"] = JSON.stringify(this.reqBody) as unknown as Body<U>;

    const res = await fetch(`${process.env["API_URL"]}${this.url}`, req as RequestInit);
    const jsonRes = await res.json();

    if (this.callback) {
      this.callback(jsonRes);
    }

    this.executed = true;
  }
}