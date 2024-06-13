import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import RestoreVaultPage from './restore-vault';

const mockStore = configureStore([]);
const store = mockStore({
  appState: { isLoading: false },
});

const meta: Meta<typeof RestoreVaultPage> = {
  title: 'Pages/Keychains/RestoreVaultPage',
  component: RestoreVaultPage,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof RestoreVaultPage>;

export const DefaultStory: Story = {};

DefaultStory.storyName = 'Default';
