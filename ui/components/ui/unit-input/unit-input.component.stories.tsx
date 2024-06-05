import React from 'react';
import { Meta } from '@storybook/react';
import UnitInput from './unit-input.component';
import configureStore from '../../../store/store';
import { Provider } from 'react-redux';

const storeMock = configureStore({
  metamask: {
    someState: 'someValue',
  },
});

const UnitInputStory = {
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
  decorators: [(story) => <Provider store={storeMock}>{story()}</Provider>],
} as Meta<typeof UnitInput>;

export const DefaultStory = (args) => <UnitInput {...args} />;

DefaultStory.storyName = 'default';

DefaultStory.args = {
  className: '',
  dataTestId: 'unit-input',
  children: 'Unit Input',
  actionComponent: null,
  error: false,
  placeholder: '0',
  suffix: '',
  hideSuffix: false,
  value: '',
  keyPressRegex: /^\d*(\.|,)?\d*$/u,
  isDisabled: false,
  isFocusOnInput: false,
};

export default UnitInputStory;

export const WithError = DefaultStory.bind({});
WithError.args = {
  ...DefaultStory.args,
  error: true,
};

export const WithSuffix = DefaultStory.bind({});
WithSuffix.args = {
  ...DefaultStory.args,
  suffix: 'ETH',
};

export const Disabled = DefaultStory.bind({});
Disabled.args = {
  ...DefaultStory.args,
  isDisabled: true,
};
