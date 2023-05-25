import { MouseEvent, useState } from "react";
import { uploadFile } from "@/src/functions/client/uploadFile";
import { FileInput } from "./FileInput";
import { TextInput } from "./TextInput";
import { createDog } from "@/src/functions/client/create/createDog";
import styles from "./index.module.css";

type PostProps = { 
  fileProp?: File | null; 
  textValueProp?: string 
};

export function Post({ fileProp, textValueProp }: PostProps) {
  const [textValue, setTextValue] = useState(textValueProp ? textValueProp : "");
  const [file, setFile] = useState<File | null>(fileProp ? fileProp : null);
  const isOkToPost = textValue !== "" && file !== null;
  const [isProcessing, setIsProcessing] = useState(false);

  async function post(event: MouseEvent) {
    event.preventDefault();
    if(!isOkToPost || isProcessing) return;
    setIsProcessing(true);
    try {
      const filePath = await uploadFile(file);
      await createDog(textValue, filePath);
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
