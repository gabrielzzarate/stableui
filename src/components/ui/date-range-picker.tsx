'use client'

import * as React from 'react'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'

import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { type DateRange } from 'react-day-picker'

export type { DateRange }

interface DateRangePickerProps {
  date?: DateRange
  onDateChange?: (date: DateRange | undefined) => void
  placeholder?: string
  className?: string
  triggerClassName?: string
  numberOfMonths?: number
  disablePastDates?: boolean
  colorTheme?: string
  showCalendarIcon?: boolean
  calendarIcon?: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function DateRangePicker({
  date,
  onDateChange,
  placeholder = 'Pick a date range',
  className,
  triggerClassName,
  numberOfMonths = 1,
  disablePastDates = true,
  colorTheme,
  showCalendarIcon = true,
  calendarIcon = <CalendarIcon className="mr-2 h-4 w-4" />,
  open: controlledOpen,
  onOpenChange,
}: DateRangePickerProps) {
  const [currentRange, setCurrentRange] = React.useState<DateRange | undefined>(date)
  const [internalOpen, setInternalOpen] = React.useState(false)

  // Use controlled open state if provided, otherwise use internal state
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen
  const setOpen = React.useCallback(
    (newOpen: boolean) => {
      if (onOpenChange) {
        onOpenChange(newOpen)
      } else {
        setInternalOpen(newOpen)
      }
    },
    [onOpenChange],
  )

  // Update local state when prop changes
  React.useEffect(() => {
    setCurrentRange(date)
  }, [date])

  const handleSelect = (selectedRange: Date | DateRange | undefined) => {
    // Type guard to ensure we only handle range selection
    if (selectedRange && typeof selectedRange === 'object' && 'from' in selectedRange) {
      setCurrentRange(selectedRange)
      onDateChange?.(selectedRange)

      // Only close if both dates are selected
      if (selectedRange.from && selectedRange.to) {
        setOpen(false)
      }
    } else if (selectedRange === undefined) {
      setCurrentRange(undefined)
      onDateChange?.(undefined)
    }
  }

  const handleOpenChange = (newOpen: boolean) => {
    if (newOpen) {
      setOpen(true)
    } else {
      // Allow closing if:
      // 1. We have a complete range (both from and to dates)
      // 2. We have no dates selected (user clicked outside or on trigger)
      // 3. User is explicitly closing via parent component
      if (currentRange?.from && currentRange?.to) {
        setOpen(false)
      } else if (!currentRange?.from) {
        setOpen(false)
      }
      // If we only have the first date selected, don't close automatically
      // This prevents closing when user is trying to select the second date
    }
  }

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover open={open} onOpenChange={handleOpenChange}>
        <PopoverTrigger asChild>
          <div
            id="date"
            className={cn(
              'w-[300px] justify-start text-left font-normal',
              !currentRange && 'text-muted-foreground',
              triggerClassName,
            )}
          >
            {showCalendarIcon && calendarIcon}
            {currentRange?.from ? (
              currentRange.to ? (
                <>
                  {format(currentRange.from, 'LLL dd, y')} - {format(currentRange.to, 'LLL dd, y')}
                </>
              ) : (
                format(currentRange.from, 'LLL dd, y')
              )
            ) : (
              <span>{placeholder}</span>
            )}
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={currentRange?.from}
            selected={currentRange}
            onSelect={handleSelect}
            disablePastDates={disablePastDates}
            numberOfMonths={numberOfMonths}
            colorTheme={colorTheme}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
