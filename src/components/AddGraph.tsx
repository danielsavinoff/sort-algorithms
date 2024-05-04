import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

function AddGraph() {
  return(
    <div className="w-full h-full grid items-center justify-center">
      <Dialog>
        <DialogTrigger asChild>
          <Button 
            variant={"ghost"}
          >
            <Plus className="h-8 w-8 text-primary/25" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Choose sort algorithm</DialogTitle>
          </DialogHeader>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder='Choose any option...' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="selection-sort">Selection Sort</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant={"default"}
            className="w-[20%]"
          >
            Add
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AddGraph