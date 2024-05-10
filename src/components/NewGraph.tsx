import { useState } from "react"

import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"

import { 
  Dialog, 
  DialogClose, 
  DialogContent, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog"

import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"

import { GraphProps } from "@/components/Graph"

import { useGraphListContext } from "@/providers/GraphListProvider"

import selectionSort from "@/utils/selectionSort"

function NewGraph() {
  const {setGraphList} = useGraphListContext()

  const [currentOption, setCurrentOption] = useState<string>('')

  let newGraph: GraphProps

  switch(currentOption) {
    case 'selection-sort':
      newGraph = {
        sort: selectionSort,
        title: 'Selection Sort'
      }
  }
  
  return(
    <div className="w-full h-full grid items-center justify-center">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={"ghost"}>
            <Plus className="h-8 w-8 text-primary/25" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Choose sort algorithm</DialogTitle>
          </DialogHeader>
          <Select onValueChange={(val) => setCurrentOption(val)}>
            <SelectTrigger>
              <SelectValue placeholder='Choose any option...' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="selection-sort">Selection Sort</SelectItem>
            </SelectContent>
          </Select>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                variant={"default"}
                size={"sm"}
                onClick={() => setGraphList(prev => [...prev, newGraph])}
              > 
                Add
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default NewGraph