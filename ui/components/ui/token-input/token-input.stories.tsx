import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import TokenInput from './token-input.component';

const meta: Meta<typeof TokenInput> = {
  title: 'Components/UI/TokenInput',
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

// Additional stories based on test cases

// Story for handling input change
export const InputChange: Story = {
  args: {
    value: '0x0',
  },
  play: async ({ args, canvasElement }) => {
    const input = canvasElement.querySelector('[data-testid="token-input"]');
    if (input) {
      (input as HTMLInputElement).value = '2';
      input.dispatchEvent(new Event('change', { bubbles: true }));
    }
  },
};

// Story for handling blur event
export const InputBlur: Story = {
  args: {
    value: '0x0',
  },
  play: async ({ args, canvasElement }) => {
    const input = canvasElement.querySelector('[data-testid="token-input"]');
    if (input) {
      (input as HTMLInputElement).value = '2';
      input.dispatchEvent(new Event('blur', { bubbles: true }));
    }
  },
};

// Story for rendering conversion rate with fiat
export const ConversionWithFiat: Story = {
  args: {
    showFiat: true,
    tokenExchangeRates: {
      '0x0': 1,
    },
  },
};

// Story for rendering conversion rate on Polygon network
export const ConversionOnPolygon: Story = {
  args: {
    showFiat: true,
    tokenExchangeRates: {
      '0x0': 1,
    },
    nativeCurrency: 'MATIC',
  },
};
