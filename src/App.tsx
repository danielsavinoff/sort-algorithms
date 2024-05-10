import Graph from "@/components/Graph"
import AddGraph from "@/components/NewGraph"
import { useGraphListContext } from "@/providers/GraphListProvider"

function App() {
  const {graphList} = useGraphListContext()
  
  return (
    <div className="w-full h-dvh p-8 gap-16 grid auto-rows-fr grid-cols-[repeat(auto-fit,minmax(min(720px,100%),1fr))]">
      {graphList.map((graph, i) => <Graph
        title={graph.title}
        sort={graph.sort}
        indexInList={i}
        key={i}
      />)}
      {graphList.length < 4 && <AddGraph />}
    </div>
  )
}

export default App
