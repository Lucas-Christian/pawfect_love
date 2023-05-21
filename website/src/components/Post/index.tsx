import { useState } from "react";
import { FileInput } from "../FileInput";
import { TextInput } from "../TextInput";
import styles from "./index.module.css";

export function Post() {
  const [ textValue, setTextValue ] = useState("");
  const [ file, setFile ] = useState<File | null>(null);
  const isOkToPost = textValue !== "" && file !== null;

  function post() {
    if(!isOkToPost) return;
    console.log("Pronto!");

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