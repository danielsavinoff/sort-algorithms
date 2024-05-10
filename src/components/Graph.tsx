import { useEffect, useState} from "react"
import { useInterval } from "react-use"

import { Play, RotateCcw, Cog, Pause, X } from "lucide-react"

import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from '@/components/ui/input'
import { Label } from "@/components/ui/label"

import { cn } from "@/lib/utils"

import { Snapshot } from "@/utils/snapshot"

import { useGraphListContext } from "@/providers/GraphListProvider"
import { randomize } from "@/lib/randomize"

export interface GraphProps {
  title?: string,
  sort: (arr: number[]) => Snapshot[],
  key: string
}


function Graph({
  title,
  sort,
  indexInList
}: GraphProps & { indexInList: number }) {
  const {setGraphList} = useGraphListContext()

  const [snapshots, setSnapshots] = useState<Snapshot[]>([])
  const [currentSnapshotIndex, setCurrentSnapshotIndex] = useState<number>(-1)
  
  const [initialData, setInitialData] = useState<number[]>([])

  const [isRunning, setIsRunning] = useState<boolean>(false)
  const [delay, setDelay] = useState<number>(500)

  // Set every needed variable on mount of the component
  useEffect(reset, [])

  // If the current snapshot is the last in the collection stop the interval
  if (currentSnapshotIndex >= snapshots.length - 1 && isRunning) {
    setIsRunning(prev => !prev)
  }

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

  function run() {
    if (currentSnapshotIndex >= snapshots.length - 1) reset()
    setIsRunning(prev => !prev)
  }

  function remove() {
    setGraphList((prev) => prev.toSpliced(indexInList, 1))
  }

  return(
    <div className="grid gap-8 h-full w-full">
      <div className="flex flex-col gap-4 h-max">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-semibold text-foreground">{title}</h2>
          <p className="text-muted-foreground text-lg leading-none">Steps: {currentSnapshotIndex + 1}</p>
        </div>
        <Controls run={run} reset={reset} remove={remove} isRunning={isRunning} delay={delay} setDelay={setDelay} />
      </div>
      <div className="border-b border-b-border pl-4 pr-4 flex gap-4 items-end">
        {currentSnapshotIndex < 0 ? (
          initialData.map(number => <Bar 
            element={number} 
            color="bg-primary/25"
          />)
        ) : (
          snapshots[currentSnapshotIndex].data.map((number, i) => {
            const currentSnapshot = snapshots[currentSnapshotIndex]

            let color: BarColor = "bg-primary/25"

            if (currentSnapshot.selected.includes(i)) color = "bg-primary/60"
            
            if (
              currentSnapshot.sorted.includes(i) ||
              currentSnapshot.next === i
            ) color = "bg-primary/100"

            let animation: BarAnimation | undefined

            if (currentSnapshot.slideLeft === i) animation = "animate-slide-left"
            else if (currentSnapshot.slideRight === i) animation = "animate-slide-right"

            return <Bar element={number} color={color} animation={animation} />
          })
        )}
      </div>
    </div>
  )
}

export default Graph

function Controls({
  run,
  reset,
  remove,
  setDelay,
  delay,
  isRunning
}: {
  run: () => void,
  reset: () => void,
  remove: () => void,
  setDelay: (ms: number) => void,
  delay: number,
  isRunning: boolean,
}) {
  return(
    <div className="flex gap-2">
      <Button variant="outline" size="icon" onClick={run}>
        {!isRunning ? (
          <Play className="h-4 w-4 fill-primary" />
        ) : (
          <Pause className="h-4 w-4 fill-primary" />
        )}
      </Button>
      <Button variant="outline" size="icon" onClick={reset}>
        <RotateCcw className="h-4 w-4"/>
      </Button>
      <SettingsButton delay={delay} setDelay={setDelay}/>
      <Button variant={"outline"} size={"icon"} onClick={remove}>
        <X className="h-4 w-4" />
      </Button>
    </div>
  )
}

function SettingsButton({
  delay,
  setDelay
}: {
  setDelay: (ms: number) => void,
  delay: number,
}) {
  return(
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon">
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
  )
}

type BarAnimation = 'animate-slide-left' | 'animate-slide-right'
type BarColor = 'bg-primary/100' | 'bg-primary/60' | 'bg-primary/25'

function Bar({
  element,
  animation,
  color
}: {
  element: number,
  animation?: BarAnimation,
  color?: BarColor
}) {
  return(
    <div 
      style={{ 
        height: `${element}%`,
      }}
      className={cn([
        'flex-1 h-full transition-color-transform rounded-tl-sm rounded-tr-sm', 
        (color && color), (animation && animation)
      ])}
      key={element}
    />
  )
}