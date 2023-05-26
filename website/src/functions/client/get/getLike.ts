export async function getLike(userId: string, dogId: string) {
  const likeRes = await fetch(`/api/getLike?user_id=${userId}&dog_id=${dogId}`, {
    method: "GET",
    headers: {
      Authorization: process.env["AUTHORIZATION_KEY"]!
    }
  });
  return await likeRes.json();
}