import type { Meta, StoryObj } from '@storybook/react'
import { DateRangePicker, type DateRange } from './date-range-picker'
import { useState } from 'react'

const meta: Meta<typeof DateRangePicker> = {
  title: 'UI/DateRangePicker',
  component: DateRangePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: { type: 'text' },
    },
    numberOfMonths: {
      control: { type: 'number', min: 1, max: 3 },
    },
    disablePastDates: {
      control: { type: 'boolean' },
    },
    colorTheme: {
      control: { type: 'color' },
    },
    showCalendarIcon: {
      control: { type: 'boolean' },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => {
    const [dateRange, setDateRange] = useState<DateRange | undefined>({
      from: new Date(),
      to: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    })
    return <DateRangePicker {...args} date={dateRange} onDateChange={setDateRange} />
  },
  args: {
    placeholder: 'Pick a date range',
  },
}

export const Empty: Story = {
  render: (args) => {
    const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined)
    return <DateRangePicker {...args} date={dateRange} onDateChange={setDateRange} />
  },
  args: {
    placeholder: 'Pick a date range',
  },
}

export const MultipleMonths: Story = {
  render: (args) => {
    const [dateRange, setDateRange] = useState<DateRange | undefined>({
      from: new Date(),
      to: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    })
    return (
      <DateRangePicker {...args} date={dateRange} onDateChange={setDateRange} numberOfMonths={2} />
    )
  },
  args: {
    numberOfMonths: 2,
  },
}

// Test story for the initial state bug fix
export const WithInitialState: Story = {
  render: (args) => {
    const [dateRange, setDateRange] = useState<DateRange | undefined>({
      from: new Date(2024, 0, 15), // January 15, 2024
      to: new Date(2024, 0, 22), // January 22, 2024
    })
    return (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          This date range picker has an initial state. Clicking on dates within the range should not
          close the popover.
        </p>
        <DateRangePicker
          {...args}
          date={dateRange}
          onDateChange={setDateRange}
          appendToPopover={<div>Hello</div>}
        />
      </div>
    )
  },
  args: {
    placeholder: 'Pick a date range',
  },
}

export const NoPastDates: Story = {
  render: (args) => {
    const [dateRange, setDateRange] = useState<DateRange | undefined>({
      from: new Date(),
      to: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    })
    return (
      <DateRangePicker
        {...args}
        date={dateRange}
        onDateChange={setDateRange}
        disablePastDates={true}
      />
    )
  },
  args: {
    disablePastDates: true,
  },
}

export const CustomTheme: Story = {
  render: (args) => {
    const [dateRange, setDateRange] = useState<DateRange | undefined>({
      from: new Date(),
      to: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    })
    return (
      <DateRangePicker
        {...args}
        date={dateRange}
        onDateChange={setDateRange}
        colorTheme="#8b5cf6"
      />
    )
  },
  args: {
    colorTheme: '#8b5cf6',
  },
}

export const NoIcon: Story = {
  render: (args) => {
    const [dateRange, setDateRange] = useState<DateRange | undefined>({
      from: new Date(),
      to: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    })
    return (
      <DateRangePicker
        {...args}
        date={dateRange}
        onDateChange={setDateRange}
        showCalendarIcon={false}
      />
    )
  },
  args: {
    showCalendarIcon: false,
  },
}

export const CustomPlaceholder: Story = {
  render: (args) => {
    const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined)
    return (
      <DateRangePicker
        {...args}
        date={dateRange}
        onDateChange={setDateRange}
        placeholder="Select your vacation dates"
      />
    )
  },
  args: {
    placeholder: 'Select your vacation dates',
  },
}

export const LongRange: Story = {
  render: (args) => {
    const [dateRange, setDateRange] = useState<DateRange | undefined>({
      from: new Date(),
      to: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days from now
    })
    return (
      <DateRangePicker {...args} date={dateRange} onDateChange={setDateRange} numberOfMonths={3} />
    )
  },
  args: {
    numberOfMonths: 3,
  },
}
