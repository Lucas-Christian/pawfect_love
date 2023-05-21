import React, { InputHTMLAttributes, ChangeEvent, Dispatch, SetStateAction } from "react";
import styles from "./index.module.css";

type TextInputProps = {
  textValue: string;
  setTextValue: Dispatch<SetStateAction<string>>;
} &InputHTMLAttributes<HTMLInputElement>;

export function TextInput({ textValue, setTextValue, ...props }: TextInputProps) {
  function handleTextInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    const filteredValue = value.replace(/[^a-zA-Z]/g, "");

    setTextValue(filteredValue);

    if(props.onChange) {
      props.onChange(event);
    }
  };

  return (
    <input
      type="text"
      {...props}
      className={styles["input"]}
      onChange={handleTextInputChange}
      value={textValue}
    />
  );
}
