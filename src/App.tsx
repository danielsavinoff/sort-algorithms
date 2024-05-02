import Graph from "@/components/Graph"
import selectionSort from "@/utils/selectionSort"

function App() {
  return (
    <div className="w-full h-dvh p-8 grid grid-cols-main gap-16 max-2xl:grid-cols-1 grid-rows-[50%]">
      <Graph title="Selection Sort" sort={selectionSort} />
    </div>
  )
}

export default App
