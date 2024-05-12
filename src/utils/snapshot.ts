export type Snapshot = {
  /** An array that is being sorted at this particular time */ 
  data: number[],
  /** Indices of already sorted elements in {@link Snapshot.data} */
  sorted: number[],
  /** Indices of elements that are being compared to each other in {@link Snapshot.data} */
  selected: number[],
  /** Amount of steps that took an algorithm */
  steps?: number,
  /** An index of the element in {@link Snapshot.data} which will be pushed in {@link Snapshot.sorted} next */
  next?: number,
  /** An index of the element in {@link Snapshot.data} which will be moved smoothly to the left */
  slideLeft?: number,
  /** An index of the element in {@link Snapshot.data} which will be moved smoothly to the right */
  slideRight?: number,
}

/**
 * @description
 * Modifies collection in-place
 */
function saveSnapshot(
  collection: Snapshot[],
  snapshot: Snapshot
) {
  const previousSnapshot = collection.at(-1)

  collection.push({
    steps: (previousSnapshot?.steps || 0) + (typeof snapshot.steps === 'undefined' ? 1 : snapshot.steps),
    data: snapshot.data.slice(),
    sorted: [...(previousSnapshot ? previousSnapshot.sorted : []), ...snapshot.sorted],
    selected: snapshot.selected,
    ...(snapshot.next && { next: snapshot.next }),
    ...(snapshot.slideLeft && { slideLeft: snapshot.slideLeft }),
    ...(snapshot.slideRight && { slideRight: snapshot.slideRight }),
  })
}

export {
  saveSnapshot
}