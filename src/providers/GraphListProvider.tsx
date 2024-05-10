import { GraphProps } from "@/components/Graph";
import { createContext, ReactElement, useContext, useState } from "react";

type GraphListProviderProps = {
  children?: ReactElement
}

type GraphListProviderState = {
  graphList: GraphProps[],
  setGraphList: React.Dispatch<React.SetStateAction<GraphProps[]>>
} 

const initialState = {
  graphList: [],
  setGraphList: () => null
}

const GraphListContextProvider = createContext<GraphListProviderState>(initialState)

function GraphListProvider({
  children
}: GraphListProviderProps) {
  const [graphList, setGraphList] = useState<GraphProps[]>([])

  return(
    <GraphListContextProvider.Provider value={{graphList, setGraphList}}>
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