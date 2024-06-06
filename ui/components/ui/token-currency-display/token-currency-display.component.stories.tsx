import React from 'react';
import { Meta, Story } from '@storybook/react';
import TokenCurrencyDisplay from './token-currency-display.component';
import { useTokenDisplayValue } from '../../../hooks/useTokenDisplayValue';

export default {
  title: 'Components/TokenCurrencyDisplay',
  component: TokenCurrencyDisplay,
  argTypes: {
    className: { control: 'text' },
    transactionData: { control: 'text' },
    token: { control: 'object' },
    prefix: { control: 'text' },
  },
} as Meta;

const Template: Story = (args) => <TokenCurrencyDisplay {...args} />;

export const Default = Template.bind({});
Default.args = {
  className: 'default-class',
  transactionData: '0x123',
  token: { symbol: 'ETH' },
  prefix: 'Ξ',
};

export const WithCustomClass = Template.bind({});
WithCustomClass.args = {
  className: 'custom-class',
  transactionData: '0x456',
  token: { symbol: 'DAI' },
  prefix: '$',
};

export const WithoutPrefix = Template.bind({});
WithoutPrefix.args = {
  className: 'no-prefix-class',
  transactionData: '0x789',
  token: { symbol: 'USDC' },
  prefix: '',
};

export const LargeValues = Template.bind({});
LargeValues.args = {
  className: 'large-values-class',
  transactionData: '0xABC',
  token: { symbol: 'BTC' },
  prefix: '₿',
};

export const SmallValues = Template.bind({});
SmallValues.args = {
  className: 'small-values-class',
  transactionData: '0xDEF',
  token: { symbol: 'ETH' },
  prefix: 'Ξ',
};

export const LoadingState = Template.bind({});
LoadingState.args = {
  className: 'loading-state-class',
  transactionData: '',
  token: { symbol: 'ETH' },
  prefix: 'Ξ',
};

export const ErrorState = Template.bind({});
ErrorState.args = {
  className: 'error-state-class',
  transactionData: 'invalid',
  token: { symbol: 'UNKNOWN' },
  prefix: '?',
};
