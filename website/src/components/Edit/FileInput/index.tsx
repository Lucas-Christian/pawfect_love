import { InputHTMLAttributes, Dispatch, SetStateAction, useRef, useState } from "react";
import React, { ChangeEvent, useEffect } from "react";
import styles from "./index.module.css";

type InputProps = {
  file: File | null;
  setFile: Dispatch<SetStateAction<File | null>>;
  type: "POST" | "UPDATE";
} & InputHTMLAttributes<HTMLInputElement>;

export function FileInput({ file, setFile, type, ...props }: InputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isExpanded, setIsExpanded] = useState(type === "UPDATE" && file !== null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0];

    if (selectedFile && isValidFileType()) {
      setFile(selectedFile);
      setIsExpanded(true);
      const url = URL.createObjectURL(selectedFile);
      setImageUrl(url);
    } else {
      setFile(null);
      setIsExpanded(false);
      event.target.value = "";
      setImageUrl(null);
    }

    function isValidFileType(): boolean {
      const acceptedFileTypes = ["image/png", "image/jpeg"];
      return acceptedFileTypes.includes(selectedFile!.type);
    }
  }

  function handleChooseFile() {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }

  useEffect(() => {
    if (type === "UPDATE" && file !== null) {
      setIsExpanded(true);
      const url = URL.createObjectURL(file);
      setImageUrl(url);
    }
  }, [type, file]);

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
      <button
        className={styles["fileButton"]}
        onClick={handleChooseFile}
        style={{ color: !file ? "rgba(0, 0, 0, 0.5)" : undefined }}
      >
        {file ? `${file.name}` : "Escolher imagem"}
      </button>
      {file && imageUrl && (
        <div
          className={`${styles["previewContainer"]} ${
            isExpanded ? styles["expanded"] : ""
          }`}
        >
          <span className={styles["previewMessage"]}>Visualize o doguinho:</span>
          <div
            className={`${styles["imageWrapper"]} ${
              isExpanded ? styles["showPreview"] : ""
            }`}
          >
            <img
              src={imageUrl}
              alt="Preview"
              className={styles["previewImage"]}
            />
          </div>
        </div>
      )}
    </div>
  );
}
