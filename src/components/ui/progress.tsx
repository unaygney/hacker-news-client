'use client'

import * as ProgressPrimitive from '@radix-ui/react-progress'
import * as React from 'react'

import { cn } from '@/lib/utils'

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
    name: string
  }
>(({ className, name, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      'relative h-9 w-full overflow-hidden rounded bg-transparent',
      className
    )}
    {...props}
  >
    <div className="absolute left-2 top-1/2 z-10 -translate-y-1/2">
      <p className="text-sm font-normal leading-5 text-neutral-900">{name}</p>
    </div>
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-orange-200 transition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
