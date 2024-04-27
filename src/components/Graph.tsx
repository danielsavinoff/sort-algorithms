import { useEffect, useState} from "react"

import { Play, RotateCcw, Cog, Pause } from "lucide-react"

import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from '@/components/ui/input'
import { Label } from "@/components/ui/label"
import { useInterval } from "react-use"

type GraphProps = {
  title?: string,
  description?: string,
  stepsCount: number,
  playFn: () => void,
  resetFn: (value: number[]) => void,
  children?: React.ReactNode,
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
  description,
  stepsCount,
  playFn,
  resetFn,
  children
}: GraphProps) {
  const [isRunning, setIsRunning] = useState<boolean>(false)
  const [delay, setDelay] = useState<number>(100)

  useEffect(() => {
    resetFn(randomize())
  }, [])

  useInterval(playFn, isRunning ? delay : null)
  
  return(
    <div className="grid gap-8 h-full w-full">
      <div className="flex flex-col gap-4 h-max">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-semibold text-foreground">{title}</h2>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => setIsRunning(prev => !prev)}
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
              onClick={() => resetFn(randomize())}
            >
              <RotateCcw className="h-4 w-4"/>
            </Button>
            <Popover>
              <PopoverTrigger asChild>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => undefined}
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
          <p className="text-muted-foreground text-lg leading-none">{description}</p>
          <p className="text-muted-foreground text-lg leading-none">Steps: {stepsCount}</p>
        </div>
      </div>
      <div className="border-b border-b-border pl-4 pr-4 flex gap-4 items-end">
        {children}
      </div>
    </div>
  )
}

export default Graph