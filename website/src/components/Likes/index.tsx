import { useSession } from "next-auth/react";
import { HeartIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { APIQueue } from "@/src/functions/manipulateAPI";
import styles from "./index.module.css";
import { getUser } from "@/src/functions/getUser";

type LikesProps = {
  dogId: number;
}


export function Likes({ dogId }: LikesProps) {
  const { data: session, status } = useSession();
  const apiQueue = new APIQueue();
  const [ isLiked, setIsLiked ] = useState(false);
  
  function Liked() {
    async function unlike() {
      let { body: user } = await getUser(session!);
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
        <p style={{ color: "#BB2E2E" }}>2.5k+</p>
      </div>
    );
  }
  function Unliked() {
    async function like() {
      let { body: user } = await getUser(session!);
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
        <p style={{ color: "#BB2E2E" }}>2.5k+</p>
      </div>
    );
  }

  if(status === "loading" || status === "unauthenticated") {
    return (
      <div className={styles["likes"]}>
        <HeartIcon style={{ width: "24px", stroke: "#71767B" }} />
        <p style={{ color: "#71767B" }}>2.5k+</p>
      </div>
    );
  }
  if(status === "authenticated") return isLiked ? <Liked /> : <Unliked />
  
  return <div>Carregando...</div>;
}