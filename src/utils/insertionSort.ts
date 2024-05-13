import { Snapshot, saveSnapshot } from "@/utils/snapshot"

/**
 * @description 
 * Sorts an array in-place implementing Insertion Sort
 */
function insertionSort(
  arr: number[]
) {
  // An array which keeps track of each step of the sort algoritm
  let snapshots: Snapshot[] = new Array()
  
  // Insertion Sort implementation
  for (let i = 1; i < arr.length; i++) {
    const temp = arr[i]
    let newTempIndex = i

    for (let j = i - 1; j >= 0; j--) {
      // Not a part of the sort algoritm
      saveSnapshot(snapshots, { data: arr, selected: [newTempIndex], sorted: [] })

      // Comparison
      if (arr[j] > temp) {
        // Swap
        arr[j + 1] = arr[j]
        newTempIndex = j

        arr[newTempIndex] = temp

        // Not a part of the sort algoritm
        saveSnapshot(snapshots, { data: arr, selected: [newTempIndex], sorted: [], slideLeft: newTempIndex, slideRight: j + 1 })
      } else break
    }
  }

  saveSnapshot(snapshots, { data: arr, selected: [], sorted: [...arr.map((_,i) => i) ], steps: 0 })
  // Returns a set of all states to render it later one-by-one
  return snapshots
}

export default insertionSort