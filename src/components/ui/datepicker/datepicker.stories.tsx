import type { Meta, StoryObj } from '@storybook/react'
import { DatePicker } from './datepicker'
import { useState } from 'react'

const meta: Meta<typeof DatePicker> = {
  title: 'UI/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: { type: 'text' },
    },
    disabled: {
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

export const Default: Story = {
  render: (args) => {
    const [date, setDate] = useState<Date | undefined>(new Date())
    return <DatePicker {...args} date={date} onDateChange={setDate} />
  },
  args: {
    placeholder: 'Pick a date',
  },
}

export const WithInitialDate: Story = {
  render: (args) => {
    const [date, setDate] = useState<Date | undefined>(new Date('2024-12-25'))
    return <DatePicker {...args} date={date} onDateChange={setDate} />
  },
  args: {
    placeholder: 'Pick a date',
  },
}

export const Disabled: Story = {
  render: (args) => {
    const [date, setDate] = useState<Date | undefined>(new Date())
    return <DatePicker {...args} date={date} onDateChange={setDate} disabled={true} />
  },
  args: {
    disabled: true,
  },
}

export const NoPastDates: Story = {
  render: (args) => {
    const [date, setDate] = useState<Date | undefined>(new Date())
    return <DatePicker {...args} date={date} onDateChange={setDate} disablePastDates={true} />
  },
  args: {
    disablePastDates: true,
  },
}

export const CustomTheme: Story = {
  render: (args) => {
    const [date, setDate] = useState<Date | undefined>(new Date())
    return <DatePicker {...args} date={date} onDateChange={setDate} colorTheme="#10b981" />
  },
  args: {
    colorTheme: '#10b981',
  },
}

export const CustomPlaceholder: Story = {
  render: (args) => {
    const [date, setDate] = useState<Date | undefined>(undefined)
    return (
      <DatePicker {...args} date={date} onDateChange={setDate} placeholder="Select your birthday" />
    )
  },
  args: {
    placeholder: 'Select your birthday',
  },
}

export const Empty: Story = {
  render: (args) => {
    const [date, setDate] = useState<Date | undefined>(undefined)
    return <DatePicker {...args} date={date} onDateChange={setDate} />
  },
  args: {},
}
