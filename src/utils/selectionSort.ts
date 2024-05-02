import { Snapshot, saveSnapshot } from "@/utils/snapshot"

/**
 * @description 
 * Sorts an array in-place implementing Selection Sort
 */
function selectionSort(
  arr: number[]
) {
  // An array which keeps track of each step of the sort algoritm
  let snapshots: Snapshot[] = new Array()

  // Selection Sort implementation
  for (let i = 0; i < arr.length - 1; i++) {
    let lowestNumIndex = i

    for (let j = 1 + i; j < arr.length; j++) {
      // Comparison
      if (arr[j] < arr[lowestNumIndex]) lowestNumIndex = j
      
      // Not a part of the sort algoritm
      saveSnapshot(snapshots, {
        data: arr, next: lowestNumIndex, selected: [j], sorted: []
      })
    }

    // Swap
    if (lowestNumIndex !== i) {
      [arr[i], arr[lowestNumIndex]] = [arr[lowestNumIndex], arr[i]]

      // Not a part of the sort algoritm
      saveSnapshot(snapshots, { data: arr, selected: [], sorted: [i], slideLeft: i, slideRight: lowestNumIndex })
    }
    
    // Not a part of the sort algoritm
    saveSnapshot(snapshots, { data: arr, selected: [], sorted: [i] })
  }

  saveSnapshot(snapshots, { data: arr, selected: [], sorted: [arr.length - 1] })
  // Returns a set of all states to render it later one-by-one
  return snapshots
}

export default selectionSort