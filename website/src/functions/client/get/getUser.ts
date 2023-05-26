export async function getUser(name: string, email: string) {
  const userRes = await fetch("/api/getUser", {
    method: "GET",
    headers: {
      Authorization: process.env["AUTHORIZATION_KEY"]!,
      name: name,
      email: email
    } as any
  });
  return await userRes.json();
}