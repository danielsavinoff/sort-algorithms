import Graph from '@/components/Graph'
import { useState } from 'react'

type TProgress = {
  i?: number,
  j?: number,
  lowestNumIndex?: number
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
      
      // The same reason as in line 22
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

      if (progress.lowestNumIndex !== i && progress.j! > newArr.length - 1) {
        let higherNumber = newArr[i]

        newArr[i] = newArr[progress.lowestNumIndex!]
        newArr[progress.lowestNumIndex!] = higherNumber

        setSteps(prev => prev += 1)
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
        }}
      >
        {data.map((e, i) => {
          const isSorted = ((typeof progress.i !== 'undefined') && i < progress.i)

          let color

          // Is the first element in the sort run-through
          if (i === progress.i) color = 'bg-primary/65'
          // Is the lowest number element in the sort run-through
          if (!color && i === progress.lowestNumIndex) color = 'bg-primary/50'
          
          // Is an element that is being compared with the lowest number element
          // Or is to the left side from the first element in the run-through
          if (!color) {
            color = (active === i || isSorted) ? 'bg-primary/100' : 'bg-primary/25'
          }

          return(
            <div 
              style={{ 
                height: `${e}%`, // Each number element of the unsorted array is being represented as height
                transform: `translateZ(0)` // Removes weird artifacts caused by rounding corners
              }}
              className={
                `flex-1 transition-all rounded-tl-sm rounded-tr-sm ${color}`
              }
              key={i}
            />
          )
        })}
      </Graph>
    </>
  )
}

export default SelectionSort