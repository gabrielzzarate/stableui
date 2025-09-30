import * as React from 'react'
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import {
  DayButton,
  DayPicker,
  getDefaultClassNames,
  type DateRange as RDPDateRange,
} from 'react-day-picker'

import { cn } from '@/lib/utils'
import { Button, buttonVariants } from '@/components/ui/button'

// Component prop types for react-day-picker
type RootComponentProps = {
  className?: string
  rootRef?: React.Ref<HTMLDivElement>
} & React.HTMLAttributes<HTMLDivElement>

type ChevronComponentProps = {
  className?: string
  orientation?: 'left' | 'right' | 'up' | 'down'
  size?: number
  disabled?: boolean
}

type CalendarProps = {
  buttonVariant?: React.ComponentProps<typeof Button>['variant']
  mode?: 'single' | 'range'
  selected?: Date | RDPDateRange
  onSelect?: (date: Date | RDPDateRange | undefined) => void
  className?: string
  classNames?: React.ComponentProps<typeof DayPicker>['classNames']
  showOutsideDays?: boolean
  captionLayout?: React.ComponentProps<typeof DayPicker>['captionLayout']
  formatters?: React.ComponentProps<typeof DayPicker>['formatters']
  components?: React.ComponentProps<typeof DayPicker>['components']
  initialFocus?: boolean
  defaultMonth?: Date
  numberOfMonths?: number
  required?: boolean
  disablePastDates?: boolean
  colorTheme?: string
}

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = 'label',
  buttonVariant = 'ghost',
  formatters,
  components,
  mode = 'single',
  selected,
  onSelect,
  initialFocus,
  defaultMonth,
  numberOfMonths,
  required,
  disablePastDates = false,
  colorTheme,
  ...props
}: CalendarProps) {
  const defaultClassNames = getDefaultClassNames()

  // Create style object for color theming
  const colorThemeStyle = colorTheme
    ? ({
        '--calendar-primary': colorTheme,
        '--calendar-primary-foreground': '#ffffff',
        '--calendar-primary-hover': colorTheme,
        '--calendar-range-bg': `${colorTheme}20`,
        '--calendar-range-hover': `${colorTheme}30`,
        '--calendar-focus-ring': colorTheme,
        '--calendar-focus-ring-30': `${colorTheme}4D`, // 30% opacity in hex
        '--calendar-focus-ring-20': `${colorTheme}33`, // 20% opacity in hex
      } as React.CSSProperties)
    : undefined

  return (
    <div style={colorThemeStyle}>
      <DayPicker
        {...({
          mode,
          selected,
          onSelect,
          showOutsideDays,
          initialFocus,
          defaultMonth,
          numberOfMonths,
          required,
          disabled: disablePastDates ? { before: new Date() } : undefined,
        } as React.ComponentProps<typeof DayPicker>)}
        className={cn(
          'bg-background group/calendar p-3 [--cell-size:2rem] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent',
          String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
          String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
          className,
        )}
        captionLayout={captionLayout}
        formatters={{
          formatMonthDropdown: (date) => date.toLocaleString('default', { month: 'short' }),
          ...formatters,
        }}
        classNames={{
          root: cn('w-fit', defaultClassNames.root),
          months: cn('relative flex flex-col gap-4 md:flex-row', defaultClassNames.months),
          month: cn('flex w-full flex-col gap-4', defaultClassNames.month),
          nav: cn(
            'absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1',
            defaultClassNames.nav,
          ),
          button_previous: cn(
            buttonVariants({ variant: buttonVariant }),
            'h-[--cell-size] w-[--cell-size] select-none p-0 aria-disabled:opacity-50 text-calendar-primary hover:text-calendar-primaryHover',
            defaultClassNames.button_previous,
          ),
          button_next: cn(
            buttonVariants({ variant: buttonVariant }),
            'h-[--cell-size] w-[--cell-size] select-none p-0 aria-disabled:opacity-50 text-calendar-primary hover:text-calendar-primaryHover',
            defaultClassNames.button_next,
          ),
          month_caption: cn(
            'flex h-[--cell-size] w-full items-center justify-center px-[--cell-size] text-calendar-primary',
            defaultClassNames.month_caption,
          ),
          dropdowns: cn(
            'flex h-[--cell-size] w-full items-center justify-center gap-1.5 text-sm font-medium',
            defaultClassNames.dropdowns,
          ),
          dropdown_root: cn(
            'has-focus:border-ring border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] relative rounded-md border',
            defaultClassNames.dropdown_root,
          ),
          dropdown: cn('bg-popover absolute inset-0 opacity-0', defaultClassNames.dropdown),
          caption_label: cn(
            'select-none font-medium',
            captionLayout === 'label'
              ? 'text-sm'
              : '[&>svg]:text-muted-foreground flex h-8 items-center gap-1 rounded-md pl-2 pr-1 text-sm [&>svg]:size-3.5',
            defaultClassNames.caption_label,
          ),
          table: 'w-full border-collapse',
          weekdays: cn('flex', defaultClassNames.weekdays),
          weekday: cn(
            'text-calendar-primary flex-1 select-none rounded-md text-[0.8rem] font-normal',
            defaultClassNames.weekday,
          ),
          week: cn('mt-2 flex w-full', defaultClassNames.week),
          week_number_header: cn(
            'w-[--cell-size] select-none',
            defaultClassNames.week_number_header,
          ),
          week_number: cn(
            'text-muted-foreground select-none text-[0.8rem]',
            defaultClassNames.week_number,
          ),
          day: cn(
            'group/day relative aspect-square h-full w-full select-none p-0 text-center [&:first-child[data-selected=true]_button]:rounded-l-md [&:last-child[data-selected=true]_button]:rounded-r-md',
            defaultClassNames.day,
          ),
          range_start: cn('bg-accent rounded-l-md', defaultClassNames.range_start),
          range_middle: cn('rounded-none', defaultClassNames.range_middle),
          range_end: cn('bg-accent rounded-r-md', defaultClassNames.range_end),
          today: cn(
            'bg-accent text-accent-foreground rounded-md data-[selected=true]:rounded-none',
            defaultClassNames.today,
          ),
          outside: cn(
            'text-muted-foreground aria-selected:text-muted-foreground',
            defaultClassNames.outside,
          ),
          disabled: cn('text-muted-foreground opacity-50', defaultClassNames.disabled),
          hidden: cn('invisible', defaultClassNames.hidden),
          ...classNames,
        }}
        components={{
          Root: ({ className, rootRef, ...props }: RootComponentProps) => {
            return <div data-slot="calendar" ref={rootRef} className={cn(className)} {...props} />
          },
          Chevron: ({ className, orientation, size, disabled }: ChevronComponentProps) => {
            const iconProps = {
              className: cn('size-4', className),
              size: size || 16,
              ...(disabled && { 'aria-disabled': true }),
            }

            if (orientation === 'left') {
              return <ChevronLeftIcon {...iconProps} />
            }

            if (orientation === 'right') {
              return <ChevronRightIcon {...iconProps} />
            }

            return <ChevronDownIcon {...iconProps} />
          },
          DayButton: CalendarDayButton,
          WeekNumber: ({
            children,
            ...props
          }: React.ComponentProps<'td'> & { children?: React.ReactNode }) => {
            return (
              <td {...props}>
                <div className="flex size-[--cell-size] items-center justify-center text-center">
                  {children}
                </div>
              </td>
            )
          },
          ...components,
        }}
        {...props}
      />
    </div>
  )
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  const defaultClassNames = getDefaultClassNames()

  const ref = React.useRef<HTMLButtonElement>(null)
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus()
  }, [modifiers.focused])

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString()}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        'data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground data-[range-middle=true]:bg-accent data-[range-middle=true]:text-accent-foreground data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50 flex aspect-square h-auto w-full min-w-[--cell-size] flex-col gap-1 font-normal leading-none data-[range-end=true]:rounded-md data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-md group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px] [&>span]:text-xs [&>span]:opacity-70',
        defaultClassNames.day,
        className,
      )}
      {...props}
    />
  )
}

export { Calendar, CalendarDayButton }
