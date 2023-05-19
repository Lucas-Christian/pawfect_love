import { Body, Req, Url, EnqueueParams } from "../types/APIQueueTypes";

export class APIQueue {
  private queue: (() => Promise<any>)[];

  constructor() {
    this.queue = [];
  }

  private async processQueue(): Promise<void> {
    const results = await Promise.allSettled(this.queue.map(request => request()));

    results.forEach((result) => {
      if (result.status === 'rejected') {
        console.error(result.reason);
      }
    });

    this.queue = [];
  }

  public enqueue<U extends Url>({ url, method, reqBody, reqHeaders, callback }: EnqueueParams<U>): void {
    const request = async () => {
      const req: Req<U> = {
        method: method,
        headers: {
          Authorization: process.env["AUTHORIZATION_KEY"]!,
          "Content-Type": "application/json",
          ...reqHeaders
        }
      };
  
      if(reqBody) req["body"] = JSON.stringify(reqBody) as unknown as Body<U>;
  
      const res = await fetch(`${process.env["API_URL"]}${url}`, req as RequestInit);
      const jsonRes = await res.json();
  
      if(callback) {
        callback(jsonRes);
      }
  
      if(this.queue.length > 0) {
        this.processQueue();
      }
    };
  
    if(this.queue.length === 0) {
      this.queue.push(request);
      this.processQueue();
    } else {
      this.queue.push(request);
    }
  }
  
}

export const apiQueue = new APIQueue();