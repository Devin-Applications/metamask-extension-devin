import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import RestoreVault from './restore-vault';

const meta: Meta<typeof RestoreVault> = {
  title: 'Components/RestoreVault',
  component: RestoreVault,
  argTypes: {
    history: { control: 'object' },
  },
  args: {
    history: {
      push: (path: string) => {
        console.log('Navigated to:', path);
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof RestoreVault>;

export const DefaultStory: Story = {};

DefaultStory.storyName = 'Default';

export const WithLeaveImportSeedScreenState: Story = {
  args: {},
};

export const WithCreateNewVaultAndRestore: Story = {
  args: {},
};

export const WithLoadingState: Story = {
  args: {},
};
