import type { Dog as DogData } from "../types/APIQueueTypes";
import { useSession } from "next-auth/react";
import { Create } from "../components/CreateButton";
import { Layout } from "../components/Layout";
import { Dog } from "../components/Dog";
import { useEffect, useState } from "react";

export default function Home() {
  const [dogs, setDogs] = useState<DogData[] | []>([]);
  const { data: session } = useSession();

  async function fetchData() {
    const response = await fetch("/api/getDogs", {
      headers: {
        Authorization: process.env["AUTHORIZATION_KEY"]!
      },
      method: "GET"
    });
    if(response.status === 200) {
      const { body: initialDogs } = await response.json();
      setDogs(initialDogs);
    }
  }

  useEffect(() => {
    fetchData();
  }, [dogs]);

  function handleSetDogs(dogId: number): void {
    const filteredDogs = (state: DogData[]) => state.filter((dog) => dog.dog_id !== dogId);
    setDogs((state) => filteredDogs(state))
  }

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
        {
          session?.isAdmin ? <Create type="desktop" /> : null
        }
      </main>
    </Layout>
  )
}