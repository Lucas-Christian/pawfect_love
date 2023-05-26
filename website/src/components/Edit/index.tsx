import { MouseEvent, useEffect, useState } from "react";
import { uploadFile } from "@/src/functions/client/uploadFile";
import { getDogFile } from "@/src/functions/client/get/getDogFile";
import { FileInput } from "./FileInput";
import { TextInput } from "./TextInput";
import { createDog } from "@/src/functions/client/create/createDog";
import { useRouter } from "next/router";
import { getDog } from "@/src/functions/client/get/getDog";
import styles from "./index.module.css";

export function Edit() {
  const router = useRouter();
  const { dogId } = router.query;

  const [initialTextValue, setInitialTextValue] = useState("");
  const [textValue, setTextValue] = useState("");

  const [initialFile, setInitialFile] = useState<File | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const { body: dogData } = await getDog(dogId as string);
      const blobFile = await getDogFile(dogData.dog_id.toString());

      setInitialTextValue(dogData.name);
      setTextValue(dogData.name);
      setInitialFile(blobFile);
      setFile(blobFile);
    }

    if (dogId) {
      fetchData();
    }
  }, [dogId]);

const isOkToEdit =
  textValue !== "" &&
  file !== null &&
  initialFile !== null &&
  (textValue !== initialTextValue || file.name !== initialFile.name);


  async function edit(event: MouseEvent) {
    event.preventDefault();
    if (!isOkToEdit || isProcessing) return;
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
    <div className={styles["editContainer"]}>
      <div className={styles["editForm"]}>
        <TextInput textValue={textValue} setTextValue={setTextValue} id="textInput" />
        <FileInput file={file} setFile={setFile} />
      </div>
      <button
        className={`${styles["editButton"]} ${!isOkToEdit ? styles["buttonTransparent"] : ""}`}
        disabled={!isOkToEdit || isProcessing}
        onClick={edit}
      >
        <p style={{ color: "#FFFFFF" }}>Editar</p>
      </button>
    </div>
  );
}
