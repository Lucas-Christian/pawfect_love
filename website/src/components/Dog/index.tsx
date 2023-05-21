import { Likes } from "../Likes";
import styles from "./index.module.css";

type DogProps = {
  dogId: number;
  name: string;
  image_url: string;
  likes: number;
}

export function Dog({ dogId, image_url, name, likes }: DogProps) {
  return (
    <div className={styles["dogContainer"]}>
      <p className={styles["dogName"]}>{name}</p>
      <div className={styles["divBeforeDogImage"]}>
        <img src={image_url} className={styles["dogImage"]} alt={`Imagem do doguinho ${name}`} />
      </div>
      <Likes dogId={dogId} likes={likes} />
    </div>
  );
}