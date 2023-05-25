import { Dog } from "@/src/types/APIQueueTypes";

export async function getDogs(): Promise<{ status: number, body: Dog[] }> {
  const response = await fetch("/api/getDogs", {
    headers: {
      Authorization: process.env["AUTHORIZATION_KEY"]!
    },
    method: "GET"
  });
  return await response.json();
}