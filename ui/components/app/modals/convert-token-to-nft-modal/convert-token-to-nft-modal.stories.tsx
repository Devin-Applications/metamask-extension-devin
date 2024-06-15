import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import ConvertTokenToNFTModal from './convert-token-to-nft-modal';
import README from './README.mdx';

const mockStore = configureStore([]);
const store = mockStore({
  metamask: {
    nfts: [],
  },
});

const meta: Meta<typeof ConvertTokenToNFTModal> = {
  title: 'Components/App/Modals/ConvertTokenToNFTModal',
  component: ConvertTokenToNFTModal,
  parameters: {
    docs: {
      page: README,
    },
  },
  argTypes: {
    hideModal: { action: 'hideModal' },
    tokenAddress: { control: 'text' },
  },
  args: {
    hideModal: () => {},
    tokenAddress: '0x1234567890abcdef',
  },
  decorators: [
    (Story) => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ConvertTokenToNFTModal>;

export const DefaultStory: Story = {};

DefaultStory.storyName = 'Default';
