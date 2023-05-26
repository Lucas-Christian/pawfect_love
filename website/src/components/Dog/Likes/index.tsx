import type { Like } from "@/src/types/APIQueueTypes";
import { useEffect, useState } from "react";
import { createLike } from "@/src/functions/client/create/createLike";
import { useSession } from "next-auth/react";
import { deleteLike } from "@/src/functions/client/delete/deleteLike";
import { HeartIcon } from "@heroicons/react/24/outline";
import { getLikes } from "@/src/functions/client/get/getLikes";
import { getUser } from "@/src/functions/client/get/getUser";
import { getLike } from "@/src/functions/client/get/getLike";
import styles from "./index.module.css";

type LikesProps = {
  dogId: string;
};

export function Likes({ dogId }: LikesProps) {
  const { data: session, status } = useSession();
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(0);

  async function fetchLikes() {
    const { body: likeArray } = await getLikes(dogId.toString());
    if(likeArray && likeArray instanceof Array) setLikes(likeArray.length);
  }
  async function fetchIsLiked() {
    const { body: user } = await getUser(session!.user!.name!, session!.user!.email!);
    const { status: likeStatus } = await getLike(user.user_id, dogId.toString());
    likeStatus === 200 ? setIsLiked(true) : setIsLiked(false);
  }

  useEffect(() => {
    if(status === "authenticated") {
      fetchIsLiked();
    }
    fetchLikes();
  }, [dogId, session, status]);

  function setLikesQuantity(likeArray: Like[]) {
    if(likeArray && likeArray instanceof Array) setLikes(likeArray.length);
  }

  async function unlike() {
    if(!isLiked) return;
    const { body: user } = await getUser(session!.user!.name!, session!.user!.email!);
    const { status: likeStatus } = await getLike(user.user_id, dogId.toString());
    if(likeStatus !== 200) return;

    const { status } = await deleteLike(user.user_id, dogId);
    const { body: likeArray } = await getLikes(dogId.toString());

    if(status === 204) setIsLiked(false);
    setLikesQuantity(likeArray);
  }

  async function like() {
    if(isLiked) return;
    const { body: user } = await getUser(session!.user!.name!, session!.user!.email!);
    const { status: likeStatus } = await getLike(user.user_id, dogId.toString());
    if(likeStatus === 200) return;
    
    const { status } = await createLike(user.user_id, dogId);
    const { body: likeArray } = await getLikes(dogId.toString());

    if(status === 201 || status === 409) setIsLiked(true);
    setLikesQuantity(likeArray);
  }

  if(status === "loading" || status === "unauthenticated") {
    return (
      <div className={styles["likes"]}>
        <HeartIcon className={styles["unauthenticatedUnlikedHeartIcon"]} />
        <p className={styles["unauthenticatedUnlikedHeartText"]}>{likes}</p>
      </div>
    );
  }

  if(status === "authenticated") {
    return (
      <div style={{ cursor: "pointer" }}>
        {isLiked ? (
          <div className={styles["likes"]} onClick={unlike}>
            <HeartIcon className={styles["likedHeartIcon"]} />
            <p className={styles["likedHeartText"]}>{likes}</p>
          </div>
        ) : (
          <div className={styles["likes"]} onClick={like}>
            <HeartIcon className={styles["unlikedHeartIcon"]} />
            <p className={styles["unlikedHeartText"]}>{likes}</p>
          </div>
        )}
      </div>
    );
  }

  return <div>Carregando...</div>;
}
