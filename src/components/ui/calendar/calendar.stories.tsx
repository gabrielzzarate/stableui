import type { Meta, StoryObj } from '@storybook/react'
import { Calendar } from './calendar'
import { useState } from 'react'
import { type DateRange } from 'react-day-picker'

const meta: Meta<typeof Calendar> = {
  title: 'UI/Calendar',
  component: Calendar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    mode: {
      control: { type: 'select' },
      options: ['single', 'range'],
    },
    buttonVariant: {
      control: { type: 'select' },
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
    },
    showOutsideDays: {
      control: { type: 'boolean' },
    },
    disablePastDates: {
      control: { type: 'boolean' },
    },
    colorTheme: {
      control: { type: 'color' },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Single date selection story
export const Single: Story = {
  render: (args) => {
    const [date, setDate] = useState<Date | undefined>(new Date())
    const handleSelect = (selectedDate: Date | { from?: Date; to?: Date } | undefined) => {
      if (selectedDate instanceof Date) {
        setDate(selectedDate)
      } else if (selectedDate === undefined) {
        setDate(undefined)
      }
    }
    return <Calendar {...args} mode="single" selected={date} onSelect={handleSelect} />
  },
  args: {
    mode: 'single',
  },
}

// Date range selection story
export const Range: Story = {
  render: (args) => {
    const [dateRange, setDateRange] = useState<DateRange | undefined>({
      from: new Date(),
      to: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    })
    const handleSelect = (selectedRange: Date | DateRange | undefined) => {
      if (selectedRange && typeof selectedRange === 'object' && 'from' in selectedRange) {
        setDateRange(selectedRange as DateRange)
      } else if (selectedRange === undefined) {
        setDateRange(undefined)
      }
    }
    return <Calendar {...args} mode="range" selected={dateRange} onSelect={handleSelect} />
  },
  args: {
    mode: 'range',
  },
}

// Calendar with custom color theme
export const CustomTheme: Story = {
  render: (args) => {
    const [date, setDate] = useState<Date | undefined>(new Date())
    const handleSelect = (selectedDate: Date | { from?: Date; to?: Date } | undefined) => {
      if (selectedDate instanceof Date) {
        setDate(selectedDate)
      } else if (selectedDate === undefined) {
        setDate(undefined)
      }
    }
    return (
      <Calendar
        {...args}
        mode="single"
        selected={date}
        onSelect={handleSelect}
        colorTheme="#3b82f6"
      />
    )
  },
  args: {
    colorTheme: '#3b82f6',
  },
}

// Calendar with past dates disabled
export const NoPastDates: Story = {
  render: (args) => {
    const [date, setDate] = useState<Date | undefined>(new Date())
    const handleSelect = (selectedDate: Date | { from?: Date; to?: Date } | undefined) => {
      if (selectedDate instanceof Date) {
        setDate(selectedDate)
      } else if (selectedDate === undefined) {
        setDate(undefined)
      }
    }
    return (
      <Calendar
        {...args}
        mode="single"
        selected={date}
        onSelect={handleSelect}
        disablePastDates={true}
      />
    )
  },
  args: {
    disablePastDates: true,
  },
}

// Calendar with different button variant
export const GhostButtons: Story = {
  render: (args) => {
    const [date, setDate] = useState<Date | undefined>(new Date())
    const handleSelect = (selectedDate: Date | { from?: Date; to?: Date } | undefined) => {
      if (selectedDate instanceof Date) {
        setDate(selectedDate)
      } else if (selectedDate === undefined) {
        setDate(undefined)
      }
    }
    return (
      <Calendar
        {...args}
        mode="single"
        selected={date}
        onSelect={handleSelect}
        buttonVariant="ghost"
      />
    )
  },
  args: {
    buttonVariant: 'ghost',
  },
}

// Multiple months view
export const MultipleMonths: Story = {
  render: (args) => {
    const [dateRange, setDateRange] = useState<DateRange | undefined>({
      from: new Date(),
      to: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    })
    const handleSelect = (selectedRange: Date | DateRange | undefined) => {
      if (selectedRange && typeof selectedRange === 'object' && 'from' in selectedRange) {
        setDateRange(selectedRange as DateRange)
      } else if (selectedRange === undefined) {
        setDateRange(undefined)
      }
    }
    return (
      <Calendar
        {...args}
        mode="range"
        selected={dateRange}
        onSelect={handleSelect}
        numberOfMonths={2}
      />
    )
  },
  args: {
    numberOfMonths: 2,
  },
}
