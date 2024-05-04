import { GraphProps } from "@/components/Graph";
import { createContext, ReactElement, useContext, useState } from "react";

type GraphListProviderProps = {
  children?: ReactElement
}

type GraphListProviderState = {
  graphs: GraphProps[],
  setGraphs: React.Dispatch<React.SetStateAction<GraphProps[]>>
} 

const initialState = {
  graphs: new Array(),
  setGraphs: () => null
}

const GraphListContextProvider = createContext<GraphListProviderState>(initialState)

function GraphListProvider({
  children
}: GraphListProviderProps) {
  const [graphs, setGraphs] = useState<GraphProps[]>([])

  return(
    <GraphListContextProvider.Provider value={{graphs, setGraphs}}>
      {children}
    </GraphListContextProvider.Provider>
  )
}

export default GraphListProvider

function useGraphListContext() {
  return useContext(GraphListContextProvider)
}

export {
  useGraphListContext
}