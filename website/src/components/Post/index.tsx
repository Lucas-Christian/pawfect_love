import styles from "./index.module.css";

export function Post() {
  return (
    <button className={styles["postButton"]}>
      <p style={{ color: "#FFFFFF" }}>Postar</p>
    </button>
  );
}