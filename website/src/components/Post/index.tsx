import { FileInput } from "../FileInput";
import { TextInput } from "../TextInput";
// import { APIQueue } from "@/src/functions/APIQueue";
import { MouseEvent, useState } from "react";
import styles from "./index.module.css";

// const apiQueue = new APIQueue();

export function Post() {
  const [ textValue, setTextValue ] = useState("");
  const [ file, setFile ] = useState<File | null>(null);
  const isOkToPost = textValue !== "" && file !== null;

  async function post(event: MouseEvent) {
    event.preventDefault();
    if (!isOkToPost) return;

    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const fileData = reader.result as ArrayBuffer;
        const blob = new Blob([fileData], { type: file!.type });

        const response = await fetch("/api/upload", {
          method: "POST",
          headers: {
            "Content-Type": file!.type,
            "Content-Disposition": `attachment; filename="${file!.name}"`,
          },
          body: blob,
        });

        if(!response.ok) {
          throw new Error("Erro ao enviar o arquivo para o servidor.");
        }

        const { message: filePath } = await response.json();

        console.log(filePath);
      };

      reader.readAsArrayBuffer(file as Blob);
    } catch (error) {
      console.error(error);
      alert("Erro ao enviar o arquivo para o servidor.");
    }
  }

  return (
    <div className={styles["postContainer"]}>
      <div className={styles["postForm"]}>
        <TextInput textValue={textValue} setTextValue={setTextValue} id="textInput" />
        <FileInput file={file} setFile={setFile} />
      </div>
      <button 
        className={`${styles["postButton"]} ${ !isOkToPost ? styles["buttonTransparent"] : "" }`}
        onClick={post}
      >
        <p style={{ color: "#FFFFFF" }}>Postar</p>
      </button>
    </div>
  );
}