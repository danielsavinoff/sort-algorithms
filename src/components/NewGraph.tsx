import { useState } from "react"

import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"

import { 
  Dialog,
  DialogContent, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog"
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectLabel, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { 
  Drawer, 
  DrawerHeader, 
  DrawerTrigger, 
  DrawerContent, 
  DrawerTitle, 
  DrawerFooter } 
from "./ui/drawer"

import { GraphProps } from "@/components/Graph"

import { useGraphListContext } from "@/providers/GraphListProvider"

import selectionSort from "@/utils/selectionSort"
import bubbleSort from "@/utils/bubbleSort"
import insertionSort from "@/utils/insertionSort"

import { useMediaQuery } from "@/hooks/useMediaQuery"


function NewGraph() {
  const {setGraphList} = useGraphListContext()

  const isDesktop = useMediaQuery("(min-width: 768px)")

  const [isEmptyErrorVisible, setIsEmptyErrorVisible] = useState<boolean>(false)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [currentOption, setCurrentOption] = useState<string>('')

  let newGraph: GraphProps

  switch(currentOption) {
    case 'selection-sort':
      newGraph = {
        sort: selectionSort,
        title: 'Selection Sort',
        key: crypto.randomUUID()
      }
      break
    case 'bubble-sort': 
      newGraph = {
        sort: bubbleSort,
        title: 'Bubble Sort',
        key: crypto.randomUUID()
      }
      break
    case 'insertion-sort': 
      newGraph = {
        sort: insertionSort,
        title: 'Insertion Sort',
        key: crypto.randomUUID()
      }
      break
  }
  
  const onSelect = (value: string) => {
    setCurrentOption(value)
    setIsEmptyErrorVisible(false)
  }

  const add = () => {
    if (!currentOption) return setIsEmptyErrorVisible(true)

    setGraphList(prev => [...prev, newGraph])
    setIsOpen(false)
  }
  
  if (!isDesktop) {
    return(
      <div className="w-full h-full grid items-center justify-center">
        <Drawer open={isOpen} onOpenChange={(state) => setIsOpen(state)}>
          <DrawerTrigger asChild>
            <Button variant={"ghost"}>
              <Plus className="h-8 w-8 text-primary/25" />
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>
                Choose sort algorithm
              </DrawerTitle>
            </DrawerHeader>
            <SelectAlgorithm 
              currentOption={currentOption}
              isEmptyErrorVisible={isEmptyErrorVisible}
              onChange={onSelect}
            />
            <DrawerFooter>
              <Button variant={"default"} size={"sm"} onClick={add}> 
                Add
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    )
  } 

  return(
    <div className="w-full h-full grid items-center justify-center">
      <Dialog open={isOpen} onOpenChange={(state) => setIsOpen(state)}>
        <DialogTrigger asChild>
          <Button variant={"ghost"}>
            <Plus className="h-8 w-8 text-primary/25" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Choose sort algorithm</DialogTitle>
          </DialogHeader>
          <SelectAlgorithm 
            currentOption={currentOption}
            isEmptyErrorVisible={isEmptyErrorVisible}
            onChange={onSelect}
          />
          <DialogFooter>
            <Button variant={"default"} size={"sm"} onClick={add}> 
              Add
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default NewGraph

const SelectAlgorithm = ({
  isEmptyErrorVisible,
  currentOption,
  onChange
}: {
  isEmptyErrorVisible: boolean,
  currentOption: string,
  onChange: (value: string) => void
}) => (
  <div className="flex flex-col gap-2">
    <Select 
      onValueChange={onChange}
      defaultValue={currentOption}
    >
      <SelectTrigger>
        <SelectValue placeholder='Choose any option...' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Sort algorithms</SelectLabel>
          <SelectItem value="selection-sort">Selection Sort</SelectItem>
          <SelectItem value="bubble-sort">Bubble Sort</SelectItem>
          <SelectItem value="insertion-sort">Insertion Sort</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
    {isEmptyErrorVisible && <p className="text-destructive font-semibold text-sm">Sort algorithm is not selected</p>}
  </div>
)