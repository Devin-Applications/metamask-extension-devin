import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';
import configureStore from '../../../../store/store';
import testData from '../../../../../.storybook/test-data';
import GasTiming from './gas-timing.component';

const createStore = () => {
  return configureStore({
    ...testData,
    metamask: {
      ...testData.metamask,
    },
  });
};

const meta: Meta<typeof GasTiming> = {
  title: 'Components/Confirmations/GasTiming',
  component: GasTiming as React.ComponentType<{ maxFeePerGas?: number; maxPriorityFeePerGas?: number; gasWarnings: any }>,
  decorators: [
    (Story) => (
      <Provider store={createStore()}>
        <Story />
      </Provider>
    ),
  ],
  argTypes: {
    maxFeePerGas: {
      control: 'number',
    },
    maxPriorityFeePerGas: {
      control: 'number',
    },
    gasWarnings: {
      control: 'object',
    },
  },
  args: {
    maxFeePerGas: 0,
    maxPriorityFeePerGas: 0,
    gasWarnings: {},
  },
};

export default meta;
type Story = StoryObj<typeof GasTiming>;

export const DefaultStory: Story = {};

DefaultStory.storyName = 'Default';
