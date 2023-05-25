export async function createDog(name: string, imagePath: string) {
  await fetch("/api/createDog", {
    method: "POST",
    headers: {
      Authorization: process.env["AUTHORIZATION_KEY"]!,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: name,
      image: imagePath.replace(/^.*public/, "")
    })
  });
}