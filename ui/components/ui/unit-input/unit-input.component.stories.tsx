import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import UnitInput from './unit-input.component';

const meta: Meta<typeof UnitInput> = {
  title: 'Components/UnitInput',
  component: UnitInput,
  argTypes: {
    className: {
      control: 'text',
    },
    dataTestId: {
      control: 'text',
    },
    children: {
      control: 'text',
    },
    actionComponent: {
      control: 'text',
    },
    error: {
      control: 'boolean',
    },
    onChange: {
      action: 'changed',
    },
    onBlur: {
      action: 'blurred',
    },
    placeholder: {
      control: 'text',
    },
    suffix: {
      control: 'text',
    },
    hideSuffix: {
      control: 'boolean',
    },
    value: {
      control: 'text',
    },
    keyPressRegex: {
      control: 'text',
    },
    isDisabled: {
      control: 'boolean',
    },
    isFocusOnInput: {
      control: 'boolean',
    },
  },
  args: {
    className: '',
    dataTestId: 'unit-input',
    children: '',
    actionComponent: '',
    error: false,
    placeholder: '0',
    suffix: 'ETH',
    hideSuffix: false,
    value: '',
    keyPressRegex: /^\d*(\.|,)?\d*$/u,
    isDisabled: false,
    isFocusOnInput: false,
  },
};

export default meta;
type Story = StoryObj<typeof UnitInput>;

export const Default: Story = {};

Default.storyName = 'Default';

export const WithChildren: Story = {
  args: {
    children: 'This is a child component',
  },
};

export const WithError: Story = {
  args: {
    error: true,
  },
};

export const Disabled: Story = {
  args: {
    isDisabled: true,
  },
};

export const WithSuffixHidden: Story = {
  args: {
    hideSuffix: true,
  },
};
