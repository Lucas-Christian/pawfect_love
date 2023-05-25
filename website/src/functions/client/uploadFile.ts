export async function uploadFile(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("name", file!.name);
  formData.append("file", file!);

  const response = await fetch("/api/upload", {
    method: "POST",
    headers: {
      Authorization: process.env["AUTHORIZATION_KEY"]!
    },
    body: formData,
  });

  if(!response.ok) throw new Error("Erro ao enviar o arquivo para o servidor.");

  const { message } = await response.json();
  return message;
}