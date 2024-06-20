import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import UnconnectedAccountAlert from './unconnected-account-alert';

const meta: Meta<typeof UnconnectedAccountAlert> = {
  title: 'Components/Alerts/UnconnectedAccountAlert',
  component: UnconnectedAccountAlert,
  parameters: {
    docs: {
      description: {
        component: 'This is the UnconnectedAccountAlert component.',
      },
    },
  },
  argTypes: {
    // Define the argTypes for the component props if needed
  },
  args: {
    // Define the default args for the component props if needed
  },
};

export default meta;
type Story = StoryObj<typeof UnconnectedAccountAlert>;

export const DefaultStory: Story = {
  render: () => <UnconnectedAccountAlert />,
};

DefaultStory.storyName = 'Default';
