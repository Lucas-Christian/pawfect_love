import { Likes } from "../Likes";
import styles from "./index.module.css";

export function Dog() {
  return (
    <div className={styles["dogContainer"]}>
      <p className={styles["dogName"]}>Biscoito</p>
      <div className={styles["divBeforeDogImage"]}>
        <img src="/dogs/Biscoito.png" className={styles["dogImage"]} alt="Imagem do doguinho Biscoito" />
      </div>
      <Likes dogId={1} />
    </div>
  );
}