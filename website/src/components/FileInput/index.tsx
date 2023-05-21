import { InputHTMLAttributes, Dispatch, SetStateAction, useRef, useState } from "react";
import React, { ChangeEvent } from "react";
import styles from "./index.module.css";

type InputProps = {
  file: File | null;
  setFile: Dispatch<SetStateAction<File | null>>;
} & InputHTMLAttributes<HTMLInputElement>;

export function FileInput({ file, setFile, ...props }: InputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0];

    if(selectedFile && isValidFileType()) {
      setFile(selectedFile);
      setIsExpanded(true);
    } else {
      setFile(null);
      setIsExpanded(false);
      event.target.value = "";
    }
    function isValidFileType(): boolean {
      const acceptedFileTypes = ["image/png", "image/jpeg"];
      return acceptedFileTypes.includes(selectedFile!.type);
    };  
  };

  function handleChooseFile() {
    if(fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className={styles["inputContainer"]}>
      <input
        type="file"
        id="file-input"
        accept="image/png, image/jpeg"
        ref={fileInputRef}
        className={styles["fileInput"]}
        onChange={handleFileChange}
        {...props}
      />
      <button className={styles["fileButton"]} onClick={handleChooseFile} style={{ color: !file ? "rgba(0, 0, 0, 0.5)" : undefined }}>
        {file ? `${file.name}` : "Escolher imagem"}
      </button>
      {file && (
        <div
          className={`${styles["previewContainer"]} ${isExpanded ? styles["expanded"] : ""}`}
        >
          <span className={styles["previewMessage"]}>Visualize o doguinho:</span>
          <div className={`${styles["imageWrapper"]} ${isExpanded ? styles["showPreview"] : ""}`}>
            <img
              src={URL.createObjectURL(file)}
              alt="Preview"
              className={styles["previewImage"]}
            />
          </div>
        </div>
      )}
    </div>
  );
}
