import { MouseEvent, useState } from "react";
import { FileInput } from "../FileInput";
import { TextInput } from "../TextInput";
import styles from "./index.module.css";

export function Post() {
  const [textValue, setTextValue] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const isOkToPost = textValue !== "" && file !== null;
  const [isProcessing, setIsProcessing] = useState(false);

  async function post(event: MouseEvent) {
    event.preventDefault();
    if(!isOkToPost || isProcessing) return;

    setIsProcessing(true);

    try {
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

      const { message: filePath } = await response.json();
      
      await fetch("/api/createDog", {
        method: "POST",
        headers: {
          Authorization: process.env["AUTHORIZATION_KEY"]!,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: textValue,
          image: filePath.replace(/^.*public/, "")
        })
      });
    } catch (error) {
      console.error(error);
      alert("Erro ao enviar o arquivo para o servidor.");
    } finally {
      setTextValue("");
      setFile(null);
      setIsProcessing(false);
    }
  }

  return (
    <div className={styles["postContainer"]}>
      <div className={styles["postForm"]}>
        <TextInput textValue={textValue} setTextValue={setTextValue} id="textInput" />
        <FileInput file={file} setFile={setFile} />
      </div>
      <button
        className={`${styles["postButton"]} ${!isOkToPost ? styles["buttonTransparent"] : ""}`}
        disabled={!isOkToPost || isProcessing}
        onClick={post}
      >
        <p style={{ color: "#FFFFFF" }}>Postar</p>
      </button>
    </div>
  );
}
