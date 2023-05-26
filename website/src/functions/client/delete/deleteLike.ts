export async function deleteLike(userId: string, dogId: string) {
  const response = await fetch(`/api/deleteLike?userId=${userId}&dogId=${dogId}`, {
    method: "DELETE",
    headers: {
      Authorization: process.env["AUTHORIZATION_KEY"]!
    }
  });

  return await response.json();
}