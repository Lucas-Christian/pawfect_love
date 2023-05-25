import { Options } from "./Options";
import { Likes } from "./Likes";
import styles from "./index.module.css";

type DogProps = {
  dogId: string;
  name: string;
  image_url: string;
  handleSetDogs: (dogId: number) => void;
}

export function Dog({ dogId, image_url, name, handleSetDogs }: DogProps) {
  return (
    <div className={styles["dogContainer"]}>
      <div className={styles["infoContainer"]}>
        <p className={styles["dogName"]}>{name}</p>
        <div className={styles["editContainer"]}>
          <Options dogId={dogId} handleSetDogs={handleSetDogs} />
        </div>
      </div>
      <div className={styles["divBeforeDogImage"]}>
        <img src={image_url} className={styles["dogImage"]} alt={`Imagem do doguinho ${name}`} />
      </div>
      <Likes dogId={dogId} />
    </div>
  );
}