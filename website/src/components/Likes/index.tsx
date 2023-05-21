import { useSession } from "next-auth/react";
import { HeartIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { APIQueue } from "@/src/functions/APIQueue";
import { getUser } from "@/src/functions/getUser";
import styles from "./index.module.css";

type LikesProps = {
  dogId: number;
  likes: number;
}

export function Likes({ dogId, likes }: LikesProps) {
  const { data: session, status } = useSession();
  const [ isLiked, setIsLiked ] = useState(false);
  const apiQueue = new APIQueue();

  function Liked() {
    async function unlike() {
      let { body: user } = await getUser(session!, apiQueue);
      apiQueue.enqueue({
        url: `/like/${user.user_id}/${dogId}`,
        method: "DELETE", 
        callback:({ status }) => {
          if(status === 204) setIsLiked(false);
        }
      });
    }
    return (
      <div className={styles["likes"]} style={{ cursor: "pointer" }} onClick={unlike}>
        <HeartIcon style={{ width: "24px", stroke: "#BB2E2E", fill: "#BB2E2E"  }} />
        <p style={{ color: "#BB2E2E" }}>{likes}</p>
      </div>
    );
  }
  function Unliked() {
    async function like() {
      let { body: user } = await getUser(session!, apiQueue);
      apiQueue.enqueue({ 
        url: `/like/${user.user_id}/${dogId}`, 
        method: "POST",
        callback: ({ status }) => {
          if(status === 201 || status === 409) setIsLiked(true);
        }
      });
    }
  
    return (
      <div className={styles["likes"]} style={{ cursor: "pointer" }} onClick={like}>
        <HeartIcon style={{ width: "24px", stroke: "#BB2E2E" }} />
        <p style={{ color: "#BB2E2E" }}>{likes}</p>
      </div>
    );
  }

  if(status === "loading" || status === "unauthenticated") {
    return (
      <div className={styles["likes"]}>
        <HeartIcon style={{ width: "24px", stroke: "#71767B" }} />
        <p style={{ color: "#71767B" }}>{likes}</p>
      </div>
    );
  }
  if(status === "authenticated") {
    useEffect(() => {
      getUser(session!, apiQueue).then(({ body: user }) => {
        apiQueue.enqueue({
          url: `/like/${dogId}/${user.user_id}`,
          method: "GET",
          callback: ({ status }) => {
            if(status === 200) setIsLiked(true);
            setIsLiked(false);
          }
        });
      });
    }, []);
    return isLiked ? <Liked /> : <Unliked />
  }
  
  return <div>Carregando...</div>;
}