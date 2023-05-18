import { Create } from "../components/CreateButton";
import { Layout } from "../components/Layout";
import { Dog } from "../components/Dog";

export default function Home() {
  return (
    <Layout>
      <main>
        <Dog />
        <Create type="desktop" />
      </main>
    </Layout>
  )
}