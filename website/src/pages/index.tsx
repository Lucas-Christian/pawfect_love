import type { Dog as DogData } from "../types/APIQueueTypes";
import { APIQueue } from "../functions/APIQueue";
import { getDogs } from "../functions/getDogs";
import { Create } from "../components/CreateButton";
import { Layout } from "../components/Layout";
import { Dog } from "../components/Dog";
import { useSession } from "next-auth/react";
import { getLikes } from "../functions/getLikes";

const apiQueue = new APIQueue();

export async function getStaticProps() {
  let dogs = await getDogs(apiQueue);
  if(!dogs) dogs = [];

  async function getDogLikes() {
    for(let dog of dogs) {
      let likes = await getLikes(dog.dog_id, apiQueue);
      if(likes) dog["likes"] = likes.length;
      dog["likes"] = 0;
    }
  }
  
  await getDogLikes();

  return {
    props: {
      dogs: dogs,
      revalidate: 300
    }
  }
}

export default function Home({ dogs }: { dogs: DogData[] | [] }) {
  const { data: session } = useSession();
  return (
    <Layout>
      <main>
        <>
          {
            dogs.length === 0 
            ? <p style={{color: "white"}}>Não temos cachorros no banco de dados.</p>
            : dogs.map(({ dog_id, name, image_url, likes }) => <Dog dogId={dog_id} name={name} image_url={image_url} likes={likes!} /> )
          }
        </>
        {
          session?.isAdmin ? <Create type="desktop" /> : null
        }
      </main>
    </Layout>
  )
}