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
  argTypes: {
    onDismiss: { action: 'dismissed' },
  },
};

export default meta;
type Story = StoryObj<typeof UnconnectedAccountAlert>;

export const DefaultStory: Story = {
  render: (args) => {
    const [showAlert, setShowAlert] = useState(false);

    const handleDismiss = () => {
      setShowAlert(false);
      args.onDismiss();
    };

    return (
      <div>
        <button onClick={() => setShowAlert(true)}>Show Alert</button>
        {showAlert && (
          <UnconnectedAccountAlert onDismiss={handleDismiss} />
        )}
      </div>
    );
  },
};

DefaultStory.storyName = 'Default';
