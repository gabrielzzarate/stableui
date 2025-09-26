import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { DatePicker } from '@/components/ui/datepicker'
import { DateRangePicker, type DateRange } from '@/components/ui/date-range-picker'

export function App() {
  const [singleDate, setSingleDate] = React.useState<Date>()
  const [rangeDate, setRangeDate] = React.useState<DateRange>()
  const [controlledRange, setControlledRange] = React.useState<DateRange>()
  const [isOpen, setIsOpen] = React.useState(false)
  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ marginBottom: 16 }}>stableui playground</h1>

      <div style={{ marginBottom: 24 }}>
        <h2 style={{ marginBottom: 12 }}>Buttons</h2>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
          <Button size="sm">Small</Button>
          <Button size="lg">Large</Button>
          <Button size="icon" aria-label="icon" />
        </div>
      </div>

      <div style={{ marginBottom: 24 }}>
        <h2 style={{ marginBottom: 12 }}>Popover</h2>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Open Popover</Button>
          </PopoverTrigger>
          <PopoverContent>
            <div style={{ padding: 16 }}>
              <h3 style={{ marginBottom: 8 }}>Popover Content</h3>
              <p>This is a popover component example.</p>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <div style={{ marginBottom: 24 }}>
        <h2 style={{ marginBottom: 12 }}>Calendar (Single Date)</h2>
        <Calendar
          mode="single"
          selected={singleDate}
          onSelect={(date) => {
            if (date instanceof Date) {
              setSingleDate(date)
            } else {
              setSingleDate(undefined)
            }
          }}
        />
      </div>

      <div style={{ marginBottom: 24 }}>
        <h2 style={{ marginBottom: 12 }}>Calendar (Single Date - No Past Dates)</h2>
        <Calendar
          mode="single"
          selected={singleDate}
          onSelect={(date) => {
            if (date instanceof Date) {
              setSingleDate(date)
            } else {
              setSingleDate(undefined)
            }
          }}
          disablePastDates={true}
        />
      </div>

      <div style={{ marginBottom: 24 }}>
        <h2 style={{ marginBottom: 12 }}>Calendar (Blue Theme)</h2>
        <Calendar
          mode="single"
          selected={singleDate}
          onSelect={(date) => {
            if (date instanceof Date) {
              setSingleDate(date)
            } else {
              setSingleDate(undefined)
            }
          }}
          colorTheme="#3b82f6"
        />
      </div>

      <div style={{ marginBottom: 24 }}>
        <h2 style={{ marginBottom: 12 }}>Calendar (Green Theme)</h2>
        <Calendar
          mode="single"
          selected={singleDate}
          onSelect={(date) => {
            if (date instanceof Date) {
              setSingleDate(date)
            } else {
              setSingleDate(undefined)
            }
          }}
          colorTheme="#10b981"
        />
      </div>

      <div style={{ marginBottom: 24 }}>
        <h2 style={{ marginBottom: 12 }}>Calendar (Date Range)</h2>
        <Calendar
          mode="range"
          selected={rangeDate}
          onSelect={(date) => {
            if (date && typeof date === 'object' && 'from' in date) {
              setRangeDate(date as DateRange)
            } else {
              setRangeDate(undefined)
            }
          }}
        />
      </div>

      <div style={{ marginBottom: 24 }}>
        <h2 style={{ marginBottom: 12 }}>Date Picker (Single)</h2>
        <DatePicker />
      </div>

      <div style={{ marginBottom: 24 }}>
        <h2 style={{ marginBottom: 12 }}>Date Picker (No Past Dates)</h2>
        <DatePicker disablePastDates={true} />
      </div>

      <div style={{ marginBottom: 24 }}>
        <h2 style={{ marginBottom: 12 }}>Date Picker (Purple Theme)</h2>
        <DatePicker colorTheme="#8b5cf6" />
      </div>

      <div style={{ marginBottom: 24 }}>
        <h2 style={{ marginBottom: 12 }}>Date Picker (Orange Theme)</h2>
        <DatePicker colorTheme="#f59e0b" />
      </div>

      <div style={{ marginBottom: 24 }}>
        <h2 style={{ marginBottom: 12 }}>Date Range Picker</h2>
        <DateRangePicker />
      </div>

      <div style={{ marginBottom: 24 }}>
        <h2 style={{ marginBottom: 12 }}>Date Range Picker (Allow Past Dates)</h2>
        <DateRangePicker disablePastDates={false} />
      </div>

      <div style={{ marginBottom: 24 }}>
        <h2 style={{ marginBottom: 12 }}>Date Range Picker (Red Theme)</h2>
        <DateRangePicker colorTheme="#ef4444" />
      </div>

      <div style={{ marginBottom: 24 }}>
        <h2 style={{ marginBottom: 12 }}>Date Range Picker (Teal Theme)</h2>
        <DateRangePicker colorTheme="#14b8a6" />
      </div>

      <div style={{ marginBottom: 24 }}>
        <h2 style={{ marginBottom: 12 }}>Controlled Date Range Picker</h2>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12 }}>
          <DateRangePicker
            date={controlledRange}
            onDateChange={setControlledRange}
            open={isOpen}
            onOpenChange={setIsOpen}
            colorTheme="#8b5cf6"
          />
          <button
            onClick={() => setIsOpen(!isOpen)}
            style={{
              padding: '8px 16px',
              backgroundColor: '#8b5cf6',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            {isOpen ? 'Close' : 'Open'} Picker
          </button>
        </div>
        <p style={{ fontSize: '14px', color: '#666' }}>
          This picker can be controlled from a parent component. Click the button to toggle it
          open/closed.
        </p>
      </div>
    </div>
  )
}
