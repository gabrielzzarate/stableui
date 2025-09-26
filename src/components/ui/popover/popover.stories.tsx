import type { Meta, StoryObj } from '@storybook/react'
import { Popover, PopoverContent, PopoverTrigger } from './popover'
import { Button } from '../button'

const meta: Meta<typeof PopoverContent> = {
  title: 'UI/Popover',
  component: PopoverContent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    align: {
      control: { type: 'select' },
      options: ['start', 'center', 'end'],
    },
    sideOffset: {
      control: { type: 'number' },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open popover</Button>
      </PopoverTrigger>
      <PopoverContent {...args}>
        <div className="space-y-2">
          <h4 className="font-medium leading-none">Popover Title</h4>
          <p className="text-sm text-muted-foreground">
            This is a simple popover with some content.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  ),
  args: {
    align: 'center',
    sideOffset: 4,
  },
}

export const WithForm: Story = {
  render: (args) => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open form</Button>
      </PopoverTrigger>
      <PopoverContent {...args}>
        <div className="space-y-4">
          <h4 className="font-medium leading-none">Contact Form</h4>
          <div className="space-y-2">
            <div>
              <label className="text-sm font-medium">Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full px-3 py-2 border rounded-md text-sm"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 border rounded-md text-sm"
              />
            </div>
            <Button size="sm" className="w-full">
              Submit
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
  args: {
    align: 'start',
    sideOffset: 4,
  },
}

export const WithList: Story = {
  render: (args) => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open menu</Button>
      </PopoverTrigger>
      <PopoverContent {...args}>
        <div className="space-y-2">
          <h4 className="font-medium leading-none">Menu Options</h4>
          <div className="space-y-1">
            <div className="px-2 py-1 hover:bg-accent rounded cursor-pointer">
              <span className="text-sm">Profile</span>
            </div>
            <div className="px-2 py-1 hover:bg-accent rounded cursor-pointer">
              <span className="text-sm">Settings</span>
            </div>
            <div className="px-2 py-1 hover:bg-accent rounded cursor-pointer">
              <span className="text-sm">Help</span>
            </div>
            <div className="px-2 py-1 hover:bg-accent rounded cursor-pointer text-destructive">
              <span className="text-sm">Sign out</span>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
  args: {
    align: 'end',
    sideOffset: 4,
  },
}

export const AlignedStart: Story = {
  render: (args) => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Start aligned</Button>
      </PopoverTrigger>
      <PopoverContent {...args}>
        <div className="space-y-2">
          <h4 className="font-medium leading-none">Start Aligned</h4>
          <p className="text-sm text-muted-foreground">This popover is aligned to the start.</p>
        </div>
      </PopoverContent>
    </Popover>
  ),
  args: {
    align: 'start',
    sideOffset: 4,
  },
}

export const AlignedEnd: Story = {
  render: (args) => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">End aligned</Button>
      </PopoverTrigger>
      <PopoverContent {...args}>
        <div className="space-y-2">
          <h4 className="font-medium leading-none">End Aligned</h4>
          <p className="text-sm text-muted-foreground">This popover is aligned to the end.</p>
        </div>
      </PopoverContent>
    </Popover>
  ),
  args: {
    align: 'end',
    sideOffset: 4,
  },
}

export const CustomOffset: Story = {
  render: (args) => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Custom offset</Button>
      </PopoverTrigger>
      <PopoverContent {...args}>
        <div className="space-y-2">
          <h4 className="font-medium leading-none">Custom Offset</h4>
          <p className="text-sm text-muted-foreground">
            This popover has a custom side offset of 20px.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  ),
  args: {
    align: 'center',
    sideOffset: 20,
  },
}
