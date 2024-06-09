import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import TokenInput from './token-input.component';

const meta: Meta<typeof TokenInput> = {
  title: 'Components/TokenInput',
  component: TokenInput,
  argTypes: {
    dataTestId: {
      control: 'text',
    },
    currentCurrency: {
      control: 'text',
    },
    onChange: {
      action: 'changed',
    },
    value: {
      control: 'text',
    },
    showFiat: {
      control: 'boolean',
    },
    hideConversion: {
      control: 'boolean',
    },
    token: {
      control: 'object',
    },
    tokenExchangeRates: {
      control: 'object',
    },
    nativeCurrency: {
      control: 'text',
    },
    tokens: {
      control: 'array',
    },
  },
  args: {
    dataTestId: 'token-input',
    currentCurrency: 'USD',
    value: '0x0',
    showFiat: true,
    hideConversion: false,
    token: {
      address: '0x0',
      decimals: 18,
      symbol: 'ETH',
    },
    tokenExchangeRates: {},
    nativeCurrency: 'ETH',
    tokens: [
      {
        address: '0x0',
        decimals: 18,
        symbol: 'ETH',
      },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof TokenInput>;

export const DefaultStory: Story = {};

DefaultStory.storyName = 'Default';

export const WithFiat: Story = {
  args: {
    showFiat: true,
  },
};

export const WithoutFiat: Story = {
  args: {
    showFiat: false,
  },
};

export const WithConversion: Story = {
  args: {
    hideConversion: false,
  },
};

export const WithoutConversion: Story = {
  args: {
    hideConversion: true,
  },
};

export const HandleChange: Story = {
  args: {
    value: '0x1',
  },
  play: async ({ args, canvasElement }) => {
    const input = canvasElement.querySelector('[data-testid="token-input"]') as HTMLInputElement | null;
    if (input) {
      input.value = '2';
      input.dispatchEvent(new Event('change', { bubbles: true }));
    }
  },
};

export const HandleBlur: Story = {
  args: {
    value: '0x1',
  },
  play: async ({ args, canvasElement }) => {
    const input = canvasElement.querySelector('[data-testid="token-input"]') as HTMLInputElement | null;
    if (input) {
      input.value = '2';
      input.dispatchEvent(new Event('blur', { bubbles: true }));
    }
  },
};
