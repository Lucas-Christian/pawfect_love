import type { Dog as DogData } from "../types/APIQueueTypes";
import { useSession } from "next-auth/react";
import { getDogs } from "../functions/getDogs";
import { Create } from "../components/CreateButton";
import { Layout } from "../components/Layout";
import { Dog } from "../components/Dog";

export async function getStaticProps() {
  let dogs = await getDogs();
  
  if(!dogs) dogs = [];

  return {
    props: {
      dogs: dogs,
      revalidate: 60
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
            : dogs.map(({ dog_id, name, image_url }) => <Dog key={`dogKey:${dog_id}${name}`} dogId={dog_id.toString()} name={name} image_url={image_url} /> )
          }
        </>
        {
          session?.isAdmin ? <Create type="desktop" /> : null
        }
      </main>
    </Layout>
  )
}