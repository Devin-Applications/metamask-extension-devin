import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import TokenCurrencyDisplay from './token-currency-display.component';

const meta: Meta<typeof TokenCurrencyDisplay> = {
  title: 'Components/TokenCurrencyDisplay',
  component: TokenCurrencyDisplay,
  argTypes: {
    className: { control: 'text' },
    transactionData: { control: 'text' },
    token: { control: 'object' },
    prefix: { control: 'text' },
  },
  args: {
    className: '',
    transactionData: '0x123',
    token: { symbol: 'ETH' },
    prefix: '',
  },
};

export default meta;
type Story = StoryObj<typeof TokenCurrencyDisplay>;

// Default story using provided props
export const DefaultStory: Story = {
  render: (args) => <TokenCurrencyDisplay {...args} />,
};

DefaultStory.storyName = 'Default';

// Story with a custom prefix to test the display of different currency symbols or text before the amount
export const WithPrefix: Story = {
  args: {
    prefix: 'Ξ',
  },
  render: (args) => <TokenCurrencyDisplay {...args} />,
};

// Story with a custom class name to test CSS integration
export const CustomClassName: Story = {
  args: {
    className: 'custom-class',
  },
  render: (args) => <TokenCurrencyDisplay {...args} />,
};

// Story with different tokens to test if the component correctly handles various token types
export const CustomToken: Story = {
  args: {
    token: { symbol: 'DAI' },
  },
  render: (args) => <TokenCurrencyDisplay {...args} />,
};

// Story with transaction data to test how the component handles and displays transaction-related information
export const WithTransactionData: Story = {
  args: {
    transactionData: '0x456',
  },
  render: (args) => <TokenCurrencyDisplay {...args} />,
};
