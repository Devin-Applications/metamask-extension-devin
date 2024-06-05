import React from 'react';
import { Meta, Story } from '@storybook/react';
import UnitInput from './unit-input.component';

export default {
  title: 'Components/UI/UnitInput',
  component: UnitInput,
  argTypes: {
    className: { control: 'text' },
    dataTestId: { control: 'text' },
    children: { control: 'text' },
    actionComponent: { control: 'text' },
    error: { control: 'boolean' },
    onChange: { action: 'changed' },
    onBlur: { action: 'blurred' },
    placeholder: { control: 'text' },
    suffix: { control: 'text' },
    hideSuffix: { control: 'boolean' },
    value: { control: 'text' },
    keyPressRegex: { control: 'text' },
    isDisabled: { control: 'boolean' },
    isFocusOnInput: { control: 'boolean' },
  },
} as Meta;

const Template: Story = (args) => <UnitInput {...args} />;

export const Default = Template.bind({});
Default.args = {
  className: '',
  dataTestId: 'unit-input',
  children: null,
  actionComponent: null,
  error: false,
  placeholder: '0',
  suffix: 'ETH',
  hideSuffix: false,
  value: '',
  keyPressRegex: /^\d*(\.|,)?\d*$/u,
  isDisabled: false,
  isFocusOnInput: false,
};

export const WithError = Template.bind({});
WithError.args = {
  ...Default.args,
  error: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...Default.args,
  isDisabled: true,
};

export const FocusOnInput = Template.bind({});
FocusOnInput.args = {
  ...Default.args,
  isFocusOnInput: true,
};
