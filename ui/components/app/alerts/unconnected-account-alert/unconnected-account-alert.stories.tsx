import React, { useState } from 'react';
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
};

export default meta;
type Story = StoryObj<typeof UnconnectedAccountAlert>;

export const DefaultStory: Story = {
  render: () => {
    const [showAlert, setShowAlert] = useState(false);

    return (
      <div>
        <button onClick={() => setShowAlert(true)}>Show Alert</button>
        {showAlert && (
          <UnconnectedAccountAlert />
        )}
      </div>
    );
  },
};

DefaultStory.storyName = 'Default';
