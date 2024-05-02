import { cn } from "@/lib/utils"

export type TBarAnimation = 'animate-slide-left' | 'animate-slide-right' | undefined
export type TBarColor = 'bg-primary/100' | 'bg-primary/60' | 'bg-primary/25' | undefined

interface BarProps {
  elementToSort: number,
  animation?: TBarAnimation,
  color?: TBarColor
}

function Bar({
  elementToSort,
  animation,
  color
}: BarProps) {
  return(
    <div 
      style={{ 
        height: `${elementToSort}%`,
      }}
      className={cn([
        'flex-1 h-full transition-color-transform rounded-tl-sm rounded-tr-sm', 
        (color ? color : ''), (animation ? animation : '')
      ])}
      key={elementToSort}
    />
  )
}

export default Bar