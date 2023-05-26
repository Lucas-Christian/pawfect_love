export async function getLikes(dogId: string) {
  const likesRes = await fetch(`/api/getLikes?dog_id=${dogId}`, {
    method: "GET",
    headers: {
      Authorization: process.env["AUTHORIZATION_KEY"]!
    }
  });
  return await likesRes.json();
}