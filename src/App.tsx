import Graph from "@/components/Graph"
import AddGraph from "@/components/NewGraph"
import { useGraphListContext } from "@/providers/GraphListProvider"

function App() {
  const {graphs} = useGraphListContext()

  return (
    <div className="w-full h-dvh p-8 gap-16 grid auto-rows-fr grid-cols-[repeat(auto-fit,minmax(min(720px,100%),1fr))]">
      {graphs.map(graph => <Graph title={graph.title} sort={graph.sort} />)}
      {graphs.length < 4 && <AddGraph />}
    </div>
  )
}

export default App
