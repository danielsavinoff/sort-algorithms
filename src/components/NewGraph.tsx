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
  SelectGroup, 
  SelectItem, 
  SelectLabel, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"

import { GraphProps } from "@/components/Graph"

import { useGraphListContext } from "@/providers/GraphListProvider"

import selectionSort from "@/utils/selectionSort"

function NewGraph() {
  const {setGraphList} = useGraphListContext()

  const [isEmptyErrorVisible, setIsEmptyErrorVisible] = useState<boolean>(false)
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const [currentOption, setCurrentOption] = useState<string>('')

  let newGraph: GraphProps

  switch(currentOption) {
    case 'selection-sort':
      newGraph = {
        sort: selectionSort,
        title: 'Selection Sort',
        key: crypto.randomUUID()
      }
  }
  
  return(
    <div className="w-full h-full grid items-center justify-center">
      <Dialog open={isDialogOpen} onOpenChange={(state) => setIsDialogOpen(state)}>
        <DialogTrigger asChild>
          <Button variant={"ghost"}>
            <Plus className="h-8 w-8 text-primary/25" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Choose sort algorithm</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-2">
            <Select 
              onValueChange={(val) => {
                setCurrentOption(val)
                setIsEmptyErrorVisible(false)
              }}
              defaultValue={currentOption}
            >
              <SelectTrigger>
                <SelectValue placeholder='Choose any option...' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Sort algorithms</SelectLabel>
                  <SelectItem value="selection-sort">Selection Sort</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            {isEmptyErrorVisible && <p className="text-destructive font-semibold text-sm">Sort algorithm is not selected</p>}
          </div>
          <DialogFooter>
            <Button
              variant={"default"}
              size={"sm"}
              onClick={() => {
                if (!currentOption) return setIsEmptyErrorVisible(true)

                setGraphList(prev => [...prev, newGraph])
                setIsDialogOpen(false)
              }}
            > 
              Add
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default NewGraph