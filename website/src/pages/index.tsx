import type { Dog as DogData } from "../types/APIQueueTypes";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getDogs } from "../functions/client/get/getDogs";
import { Create } from "../components/CreateButton";
import { Layout } from "../components/Layout";
import { Dog } from "../components/Dog";

export default function Home() {
  const [dogs, setDogs] = useState<DogData[] | []>([]);
  const { data: session } = useSession();

  async function fetchData() {
    const { body: initialDogs } = await getDogs();
    if(initialDogs && initialDogs.length > 0) setDogs(initialDogs);
  }
  
  function handleSetDogs(dogId: number): void {
    const filteredDogs = (state: DogData[]) => state.filter((dog) => dog.dog_id !== dogId);
    setDogs((state) => filteredDogs(state))
  }

  useEffect(() => {
    fetchData();
  }, [dogs]);

  return (
    <Layout>
      <main>
        <>
          {
            dogs.length === 0 ? <p style={{color: "white"}}>Não temos cachorros no banco de dados.</p>
            : dogs.map(({ dog_id, name, image_url }) => 
                <Dog 
                  key={`dogKey:${dog_id}${name}`} 
                  dogId={dog_id.toString()} 
                  name={name} 
                  image_url={image_url}
                  handleSetDogs={handleSetDogs}
                /> 
              )
          }
        </>
      </main>
      {
        session?.isAdmin ? <Create type="desktop" /> : null
      }
    </Layout>
  )
}