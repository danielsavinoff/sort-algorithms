import { Snapshot, saveSnapshot } from "@/utils/snapshot"

/**
 * @description 
 * Sorts an array in-place implementing Bubble Sort
 */
function bubbleSort(
  arr: number[]
) {
  // An array which keeps track of each step of the sort algoritm
  let snapshots: Snapshot[] = new Array()

  // Bubble Sort implementation
  let sortedUntilIndex = arr.length - 1
  let sorted = false

  while (!sorted) {
    sorted = true

    for (let i = 0; i < sortedUntilIndex; i++) {
      // Not a part of the sort algoritm
      saveSnapshot(snapshots, { data: arr, selected: [i, i + 1], sorted: [] })
      
      // Comparison
      if (arr[i] > arr[i + 1]) {
        // Swap
        [arr[i],arr[i + 1]] = [arr[i + 1], arr[i]]

        sorted = false

        // Not a part of the sort algoritm
        saveSnapshot(snapshots, { data: arr, selected: [i, i + 1], sorted: [], slideLeft: i, slideRight: i + 1 })
      }
    }

    // Not a part of the sort algoritm
    saveSnapshot(snapshots, { data: arr, selected: [], sorted: [sortedUntilIndex], steps: 0 })

    sortedUntilIndex--
  }

  saveSnapshot(snapshots, { data: arr, selected: [], sorted: [...numbersToZero(sortedUntilIndex)], steps: 0 })
  // Returns a set of all states to render it later one-by-one
  return snapshots
}

export default bubbleSort

function numbersToZero(number: number, arr: number[] = []) {
  if (number < 0) return arr

  arr.push(number)

  return numbersToZero(number - 1, arr) 
}