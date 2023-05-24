import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { HeartIcon } from "@heroicons/react/24/outline";
import styles from "./index.module.css";

type LikesProps = {
  dogId: number;
};

async function getUserAPI(name: string, email: string) {
  const userRes = await fetch("/api/getUser", {
    method: "GET",
    headers: {
      Authorization: process.env["AUTHORIZATION_KEY"]!,
      name: name,
      email: email
    } as any
  });
  return await userRes.json();
}

async function getLikeAPI(userId: string, dogId: string) {
  const likeRes = await fetch(`/api/getLike?user_id=${userId}&dog_id=${dogId}`, {
    method: "GET",
    headers: {
      Authorization: process.env["AUTHORIZATION_KEY"]!
    }
  });
  return await likeRes.json();
}

async function getLikesAPI(dogId: string) {
  const likesRes = await fetch(`/api/getLikes?dog_id=${dogId}`, {
    method: "GET",
    headers: {
      Authorization: process.env["AUTHORIZATION_KEY"]!
    }
  });
  return await likesRes.json();
}

export function Likes({ dogId }: LikesProps) {
  const { data: session, status } = useSession();
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    async function fetchLikes() {
      const { body: likeArray } = await getLikesAPI(dogId.toString());
      if(likeArray && likeArray instanceof Array) setLikes(likeArray.length);
    }
    if(status === "authenticated") {
      async function fetchIsLiked() {
        const { body: user } = await getUserAPI(session!.user!.name!, session!.user!.email!);
        const { status: likeStatus } = await getLikeAPI(user.user_id, dogId.toString());
        likeStatus === 200 ? setIsLiked(true) : setIsLiked(false);
      }
      fetchIsLiked();
    }
    fetchLikes();
  }, [dogId, session, status]);

  async function unlike() {
    if(!isLiked) return;
    const { body: user } = await getUserAPI(session!.user!.name!, session!.user!.email!);
    const { status: likeStatus } = await getLikeAPI(user.user_id, dogId.toString());
    if(likeStatus !== 200) return;

    const response = await fetch(`/api/deleteLike?userId=${user.user_id}&dogId=${dogId}`, {
      method: "DELETE",
      headers: {
        Authorization: process.env["AUTHORIZATION_KEY"]!
      }
    });

    const { status } = await response.json();
    const { body: likeArray } = await getLikesAPI(dogId.toString());

    if(status === 204) setIsLiked(false);
    if(likeArray && likeArray instanceof Array) setLikes(likeArray.length);
  }

  async function like() {
    if(isLiked) return;
    const { body: user } = await getUserAPI(session!.user!.name!, session!.user!.email!);
    const { status: likeStatus } = await getLikeAPI(user.user_id, dogId.toString());
    if(likeStatus === 200) return;
    
    const response = await fetch("/api/createLike", {
      method: "POST",
      headers: {
        Authorization: process.env["AUTHORIZATION_KEY"]!,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: user.user_id,
        dogId: dogId
      })
    });
    const { status } = await response.json();
    const { body: likeArray } = await getLikesAPI(dogId.toString());

    if(status === 201 || status === 409) setIsLiked(true);
    if(likeArray && likeArray instanceof Array) setLikes(likeArray.length);
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
    return (
      <div style={{ cursor: "pointer" }}>
        {isLiked ? (
          <div className={styles["likes"]} onClick={unlike}>
            <HeartIcon style={{ width: "24px", stroke: "#BB2E2E", fill: "#BB2E2E" }} />
            <p style={{ color: "#BB2E2E" }}>{likes}</p>
          </div>
        ) : (
          <div className={styles["likes"]} onClick={like}>
            <HeartIcon style={{ width: "24px", stroke: "#BB2E2E" }} />
            <p style={{ color: "#BB2E2E" }}>{likes}</p>
          </div>
        )}
      </div>
    );
  }

  return <div>Carregando...</div>;
}
