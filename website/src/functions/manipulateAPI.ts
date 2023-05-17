type Url = 
  "/user" | `/user/${number | string}` |
  "/admin" | `/admin/${number}` |
  "/dog" | `/dog/${number}` |
  "/like" | `/like/${number}/${number}`;

type Method = "GET" | "POST" | "DELETE" | "PATCH" | "PUT";

type Body<U extends Url> =
  U extends "/user" ? { name?: string; email?: string; } | null | undefined : 
  U extends "/dog" ? { name?: string; image?: string; } | null | undefined :
  undefined;

type User = { user_id: number; name: string; email: string; };
type Dog = { dog_id: number; name: string; image_url: string; };
type Like = { like_id: number; user_id: number; dog_id: number; };
type Admin = { admin_id: number; user_id: number; };

type EnqueueParams<U extends Url> = {
  url: U, 
  method: Method,
  reqBody?: Body<U>, 
  reqHeaders?: Headers, 
  callback?: ((response: Res<U>) => void)
}

type Headers = {
  email?: string;
}

type Req<U extends Url> = {
  method: Method;
  headers: {
    Authorization: string;
    "Content-Type": string;
  } & Headers
  body?: Body<U>;
} | null | undefined;

export type Res<U extends Url> =
  U extends "/users" ? { status: number; body: User[]; } :
  U extends `/user/${number}` ? { status: number; body: User; } :
  U extends "/user"? { status: number; body: User; } :
  U extends "/admins" ? { status: number; body: Admin[] } :
  U extends `/admin/${number}` ? { status: number; body: Admin } :
  U extends "/dogs" ? { status: number; body: Dog[] } :
  U extends `/dog/${number}` ? { status: number; body: Dog } :
  U extends "/likes" ? { status: number; body: Like[] } :
  { status: number; body: Like };

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
  
      if (this.queue.length > 0) {
        this.processQueue();
      }
    };
  
    if (this.queue.length === 0) {
      this.queue.push(request);
      this.processQueue();
    } else {
      this.queue.push(request);
    }
  }
  
}
  