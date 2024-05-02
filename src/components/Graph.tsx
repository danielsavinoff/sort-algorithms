import { useEffect, useState} from "react"
import { useInterval } from "react-use"

import { Play, RotateCcw, Cog, Pause } from "lucide-react"

import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from '@/components/ui/input'
import { Label } from "@/components/ui/label"

import Bar, { TBarAnimation, TBarColor } from "@/components/Bar"
import { Snapshot } from "@/utils/snapshot"

type GraphProps = {
  title?: string,
  sort: (arr: number[]) => Snapshot[],
}

type THashTable = {
  [key: string | number]: any
}

function randomize(size = 2**4) {
  const temp: THashTable = {}
  const nums = new Array()

  for (let i = 0; i < size; i++) {
    let num

    do {
      num = Math.max(1, Math.floor(Math.random() * 100))
    } while (!num || temp[num])

    temp[num] = true
    nums.push(num)
  }

  return nums
}

function Graph({
  title,
  sort
}: GraphProps) {
  const [snapshots, setSnapshots] = useState<Snapshot[]>([])
  const [currentSnapshotIndex, setCurrentSnapshotIndex] = useState<number>(-1)
  
  const [initialData, setInitialData] = useState<number[]>([])

  const [isRunning, setIsRunning] = useState<boolean>(false)
  const [delay, setDelay] = useState<number>(500)

  // Set every needed variable on mount of the component
  useEffect(reset, [])

  // If the current snapshot is the last in the collection stop the interval
  useEffect(() => {
    if (currentSnapshotIndex >= snapshots.length - 1) setIsRunning(prev => !prev)
  }, [currentSnapshotIndex])

  // If play button is pressed change the index of the current snapshot
  useInterval(() => {
    setCurrentSnapshotIndex(prev => prev += 1)
  }, isRunning ? delay : null)
  
  function reset() {
    const newData = randomize()
    
    setInitialData(newData)
    setSnapshots(sort(newData.slice()))
    setCurrentSnapshotIndex(-1)
  }

  return(
    <div className="grid gap-8 h-full w-full">
      <div className="flex flex-col gap-4 h-max">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-semibold text-foreground">{title}</h2>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => {
                if (currentSnapshotIndex >= snapshots.length - 1) reset()
                setIsRunning(prev => !prev)
              }}
            >
              {!isRunning ? (
                <Play className="h-4 w-4 fill-primary" />
              ) : (
                <Pause className="h-4 w-4 fill-primary" />
              )}
            </Button>
            <Button 
              variant="outline" 
              size="icon"
              onClick={reset}
            >
              <RotateCcw className="h-4 w-4"/>
            </Button>
            <Popover>
              <PopoverTrigger asChild>
                <Button 
                  variant="outline" 
                  size="icon"
                >
                  <Cog className="h-4 w-4"/>
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <h4 className="font-medium leading-none">Settings</h4>
                    <p className="text-sm text-muted-foreground">
                      Change how the algorithm is being executed
                    </p>
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="delay">Delay (ms)</Label>
                    <Input
                      id="delay"
                      type="number"
                      className="col-span-2 h-8"
                      value={delay}
                      onChange={(e) => setDelay(parseInt(e.target.value))}
                    />
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className="grid gap-2">
          <p className="text-muted-foreground text-lg leading-none">Steps: {currentSnapshotIndex + 1}</p>
        </div>
      </div>
      <div className="border-b border-b-border pl-4 pr-4 flex gap-4 items-end">
        {currentSnapshotIndex < 0 ? (
          initialData.map(number => {
            return <Bar elementToSort={number} color="bg-primary/25" />
          })
        ) : (
          snapshots[currentSnapshotIndex].data.map((number, i) => {
            const currentSnapshot = snapshots[currentSnapshotIndex]

            let color: TBarColor = "bg-primary/25"

            if (currentSnapshot.selected.includes(i)) color = "bg-primary/60"
            
            if (
              currentSnapshot.sorted.includes(i) ||
              currentSnapshot.next === i
            ) color = "bg-primary/100"

            let animation: TBarAnimation

            if (currentSnapshot.slideLeft === i) animation = "animate-slide-left"
            else if (currentSnapshot.slideRight === i) animation = "animate-slide-right"

            return <Bar elementToSort={number} color={color} animation={animation} />
          })
        )}
      </div>
    </div>
  )
}

export default Graph