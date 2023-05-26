import { InputHTMLAttributes, Dispatch, SetStateAction, useRef, useState, useEffect } from "react";
import React, { ChangeEvent } from "react";
import styles from "./index.module.css";

type InputProps = {
  file: File | null;
  setFile: Dispatch<SetStateAction<File | null>>;
} & InputHTMLAttributes<HTMLInputElement>;

export function FileInput({ file, setFile, ...props }: InputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (file) {
      setIsExpanded(true);

      const reader = new FileReader();

      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };

      reader.readAsDataURL(file);
    } else {
      setIsExpanded(false);
      setPreviewUrl(null);
    }
  }, [file]);

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      if (isValidFileType(selectedFile)) {
        setFile(selectedFile);
      } else {
        setFile(null);
      }
    } else {
      setFile(null);
    }

    function isValidFileType(file: File): boolean {
      const acceptedFileTypes = ["image/png", "image/jpeg"];
      return acceptedFileTypes.includes(file.type);
    }
  }

  function handleChooseFile() {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }

  return (
    <div className={styles["inputContainer"]}>
      <input
        type="file"
        id="file-input"
        accept="image/png, image/jpeg"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={handleFileChange}
        {...props}
      />
      <button className={styles["fileButton"]} onClick={handleChooseFile} style={{ color: !file ? "rgba(0, 0, 0, 0.5)" : undefined }}>
        {file ? `${file.name}` : "Escolher imagem"}
      </button>
      {file && previewUrl && (
        <div
          className={`${styles["previewContainer"]} ${isExpanded ? styles["expanded"] : ""}`}
        >
          <span className={styles["previewMessage"]}>Visualize o doguinho:</span>
          <div className={`${styles["imageWrapper"]} ${isExpanded ? styles["showPreview"] : ""}`}>
            <img
              src={previewUrl}
              alt="Preview"
              className={styles["previewImage"]}
            />
          </div>
        </div>
      )}
    </div>
  );
}
