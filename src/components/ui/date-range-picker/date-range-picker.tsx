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
  appendToPopover?: React.ReactNode
  rangeDisplayOverride?: React.ReactNode
  calendarClassName?: string
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
  calendarIcon = <CalendarIcon className="mr-2 w-4 h-4" />,
  open: controlledOpen,
  onOpenChange,
  appendToPopover,
  calendarClassName,
  ...props
}: DateRangePickerProps) {
  const [currentRange, setCurrentRange] = React.useState<DateRange | undefined>(date)
  const [internalOpen, setInternalOpen] = React.useState(false)
  const isSelectingRef = React.useRef(false)

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

      // Mark that we're in the middle of selecting
      if (selectedRange.from && !selectedRange.to) {
        isSelectingRef.current = true
      } else if (selectedRange.from && selectedRange.to) {
        isSelectingRef.current = false
        // Only close the popover if this is a new range selection
        // Don't close if the user is modifying an existing range
        // const wasExistingRange = currentRange?.from && currentRange?.to
        // const isNewRange = !wasExistingRange

        // if (isNewRange) {
        //   setOpen(false)
        // }
      }
    } else if (selectedRange === undefined) {
      setCurrentRange(undefined)
      onDateChange?.(undefined)
      isSelectingRef.current = false
    }
  }

  const handleOpenChange = (newOpen: boolean) => {
    if (newOpen) {
      setOpen(true)
      // Reset selection state when opening
      isSelectingRef.current = false
    } else {
      // Allow closing if:
      // 1. We have no dates selected (user clicked outside or on trigger)
      // 2. We're not in the middle of selecting a range
      // if (!currentRange?.from) {
      //   // No dates selected - allow closing (user clicked outside or on trigger)
      //   setOpen(false)
      // } else if (!isSelectingRef.current) {
      //   // Not in the middle of selecting - allow closing
      //   setOpen(false)
      // }
      setOpen(false)
      // If we're in the middle of selecting (only first date selected), don't close
    }
  }

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover open={open} onOpenChange={handleOpenChange}>
        <PopoverTrigger asChild>
          {props?.rangeDisplayOverride ?? (
            <div
              id="date"
              className={cn(
                'w-[300px] flex items-center justify-start text-left font-normal',
                !currentRange && 'text-muted-foreground',
                triggerClassName,
              )}
            >
              {showCalendarIcon && calendarIcon}
              {currentRange?.from ? (
                currentRange.to ? (
                  <>
                    {format(currentRange.from, 'MM/dd/yyyy')} -{' '}
                    {format(currentRange.to, 'MM/dd/yyyy')}
                  </>
                ) : (
                  format(currentRange.from, 'MM/dd/yyyy')
                )
              ) : (
                <span>{placeholder}</span>
              )}
            </div>
          )}
        </PopoverTrigger>
        <PopoverContent className="p-0 w-auto" align="start">
          <Calendar
            initialFocus
            mode="range"
            className={calendarClassName}
            defaultMonth={currentRange?.from}
            selected={currentRange}
            onSelect={handleSelect}
            disablePastDates={disablePastDates}
            numberOfMonths={numberOfMonths}
            colorTheme={colorTheme}
          />
          {appendToPopover}
        </PopoverContent>
      </Popover>
    </div>
  )
}
