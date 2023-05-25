import type { Url, EnqueueParams } from "../../types/APIQueueTypes";
import { QueuedRequest } from "./QueuedRequest";

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