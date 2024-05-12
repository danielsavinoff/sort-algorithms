export function randomize(
  size: number = 10, 
  nums: Set<number> = new Set()
) {
  if (size <= 0) return [...nums]

  let num

  while (!num || nums.has(num)) {
    num = Math.max(10, Math.floor(Math.random() * 99))
  }

  nums.add(num)

  return randomize(size - 1, nums)
}