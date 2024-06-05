import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Provider } from 'react-redux';
import configureStore from '../../../store/store';
import UnitInput from './unit-input.component';

const storeMock = configureStore({
  metamask: {
    someState: {},
  },
});

export default {
  title: 'Components/UI/UnitInput',
  component: UnitInput,
  decorators: [(story) => <Provider store={storeMock}>{story()}</Provider>],
} as Meta<typeof UnitInput>;

const Template: Story<typeof UnitInput> = (args) => <UnitInput {...args} />;

export const Default = Template.bind({});
Default.args = {
  value: '',
  placeholder: '0',
  suffix: 'ETH',
  onChange: (value) => console.log('Changed:', value),
  onBlur: (value) => console.log('Blurred:', value),
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

export const WithActionComponent = Template.bind({});
WithActionComponent.args = {
  ...Default.args,
  actionComponent: <button>Action</button>,
};
