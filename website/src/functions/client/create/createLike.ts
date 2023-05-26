export async function createLike(userId: string, dogId: string) {
  const response = await fetch("/api/createLike", {
    method: "POST",
    headers: {
      Authorization: process.env["AUTHORIZATION_KEY"]!,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      userId: userId,
      dogId: dogId
    })
  });
  return await response.json();
}