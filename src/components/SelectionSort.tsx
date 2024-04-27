import Graph from '@/components/Graph'
import { useState } from 'react'

type TProgress = {
  i?: number,
  j?: number,
  previousLowestNumIndex?: number,
  lowestNumIndex?: number,
  swap?: boolean
}

function SelectionSort() {
  const [data, setData] = useState<number[]>([])
  const [progress, setProgress] = useState<TProgress>({})
  const [active, setActive] = useState<number>(-1)
  const [steps, setSteps] = useState<number>(0)
  
  /**
   * Sorts a copy of the data array in ascending order and updates state, implementing selection sort algorithm
   */
  function sort() {
    let newArr = data.slice()

    // A separate variable in order to prevent updating the amount of run throughs
    let iLim = progress.i || 0
    
    for (let i = iLim; i < Math.min(iLim + 1, newArr.length - 1); i++) {
      let lowestNumIndex = progress.lowestNumIndex || i
      
      // The same reason as in line 23
      let jLim = (progress.j || 1 + i)

      for (let j = jLim; j < Math.min(jLim + 1, newArr.length); j++) {
        if (newArr[j] < newArr[lowestNumIndex]) lowestNumIndex = j
        
        setSteps(prev => prev += 1)
        setProgress((prevProgress) => ({
          ...prevProgress,
          j: (((prevProgress.j || (1 + (i))) + 1) || (1 + (i))),
          lowestNumIndex: lowestNumIndex
        }))
        setActive(j)
      }

      setProgress((prevProgress) => ({
        ...prevProgress,
        swap: false
      }))

      if (progress.lowestNumIndex !== i && progress.j! > newArr.length - 1) {
        let higherNumber = newArr[i]

        newArr[i] = newArr[progress.lowestNumIndex!]
        newArr[progress.lowestNumIndex!] = higherNumber
        console.log('swap')
        setSteps(prev => prev += 1)
        setProgress((prevProgress) => ({
          ...prevProgress,
          previousLowestNumIndex: progress.lowestNumIndex,
          swap: true
        }))
      }
    }

    const next = (progress.j && progress.j >= newArr.length)

    setProgress((prevProgress) => ({
      ...prevProgress, 
      i: (prevProgress.i || 0) + (next ? 1 : 0),
      j: (next ? undefined : prevProgress.j),
      lowestNumIndex: (next ? undefined : prevProgress.lowestNumIndex)
    }))
    setData(newArr)
  }

  return(
    <>
      <Graph
        title='Selection Sort'
        description='Time complexity: O(N^2)'
        stepsCount={steps}
        playFn={sort}
        resetFn={(newData: number[]) => {
          setData(newData)
          setProgress({})
          setSteps(0)
          setActive(-1)
        }}
      >
        {data.map((e, i) => {
          const isSorted = ((typeof progress.i !== 'undefined') && (i < progress.i) || (i === progress.i && progress.i === data.length - 1))
          const isBeingSwapped = typeof progress.i !== 'undefined' && i === progress.i - 1 && progress.swap

          let color

          // Is an element that is being compared with the lowest number element
          // Or is to the left side from the first element in the run-through
          color = (i === progress.lowestNumIndex || isSorted) ? 'bg-primary/100' : 'bg-primary/25'

          // Is the lowest number element in the sort run-through
          if (active === i && progress.j) color = 'bg-primary/60'

          return(
            <div className="flex-1 h-full items-end flex">
              <div 
                style={{ 
                  // Each number element of the unsorted array is being represented as height
                  height: `${e}%`,
                }}
                className={
                  `w-full transition-color-transform rounded-tl-sm rounded-tr-sm ${color} ${isBeingSwapped ? 'animate-slide-left' : ''} ${progress.previousLowestNumIndex === i ? 'animate-slide-right' : ''}`
                }
                key={i}
              />
            </div>
          )
        })}
      </Graph>
    </>
  )
}

export default SelectionSort