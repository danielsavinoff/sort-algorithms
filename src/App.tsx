import Graph from "@/components/Graph"
import selectionSort from "@/utils/selectionSort"
import { ReactElement, useState } from "react"
import AddGraph from "@/components/AddGraph"
import { GraphProps } from "@/components/Graph"

function App() {
  const [graphs, setGraphs] = useState<GraphProps[]>([{title: 'Selection Sort', sort: selectionSort}
  ])

  //max-2xl:grid-cols-1
  return (
    <div className="w-full h-dvh p-8 gap-16 grid auto-rows-fr grid-cols-[repeat(auto-fit,minmax(min(720px,100%),1fr))]">
      {graphs.map(graph => <Graph title={graph.title} sort={graph.sort} />)}
      {graphs.length < 4 && <AddGraph />}
    </div>
  )
}

export default App
