import { Dog } from "@/src/types/APIQueueTypes";

export async function getDog(dogId: string): Promise<{ status: number; body: Dog; }> {
  const response = await fetch(`/api/getDog?dogId=${dogId}`, {
    method: "GET",
    headers: {
      Authorization: process.env["AUTHORIZATION_KEY"]!
    },
  });
  return await response.json();
}