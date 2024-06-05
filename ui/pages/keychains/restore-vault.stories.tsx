import React, { createContext, useContext } from 'react';
import { Meta } from '@storybook/react';
import { Provider } from 'react-redux';
import configureStore from '../../store/store';
import RestoreVaultPage from './restore-vault';
import { createNewVaultAndRestore, unMarkPasswordForgotten } from '../../store/actions';
import ReactDOMServer from 'react-dom/server';

const storeMock = configureStore({
  appState: {
    isLoading: false,
  },
  metamask: {
    // Add any necessary mock state here
    selectedAddress: '0x1234567890abcdef1234567890abcdef12345678',
    identities: {
      '0x1234567890abcdef1234567890abcdef12345678': {
        address: '0x1234567890abcdef1234567890abcdef12345678',
        name: 'Account 1',
      },
    },
  },
});

const mockTFunction = (key, ...args) => {
  const translations = {
    resetWallet: 'Reset Wallet',
    resetWalletSubHeader: 'This action will reset your wallet.',
    resetWalletUsingSRP: 'This action will delete your current wallet and Secret Recovery Phrase from this device, along with the list of accounts you’ve curated. After resetting with a Secret Recovery Phrase, you’ll see a list of accounts based on the Secret Recovery Phrase you use to reset. This new list will automatically include accounts that have a balance. You’ll also be able to $1 created previously. Custom accounts that you’ve imported will need to be $2, and any custom tokens you’ve added to an account will need to be $3 as well.',
    reAddAccounts: 're-add accounts',
    reAdded: 're-added',
  };

  let translation = translations[key] || key;
  console.log('mockTFunction called with:', { key, args }); // Add logging to inspect arguments
  args.forEach((arg, index) => {
    console.log(`Argument ${index + 1}:`, arg, 'Type:', typeof arg); // Log argument details
    if (React.isValidElement(arg)) {
      const renderedString = ReactDOMServer.renderToString(arg);
      console.log(`Rendered React element to string:`, renderedString); // Log rendered string
      translation = translation.replace(`$${index + 1}`, renderedString);
    } else if (typeof arg === 'string') {
      translation = translation.replace(`$${index + 1}`, arg);
    } else {
      translation = translation.replace(`$${index + 1}`, JSON.stringify(arg));
    }
  });
  console.log('Final translation before return:', translation); // Log final translation before return
  return translation; // Return plain string instead of React element
};

const RestoreVaultPageContext = createContext({
  t: mockTFunction,
  trackEvent: () => {},
});

const MockContextProvider = ({ children }) => {
  const contextValue = {
    t: mockTFunction,
    trackEvent: () => {},
  };

  return (
    <RestoreVaultPageContext.Provider value={contextValue}>
      {children}
    </RestoreVaultPageContext.Provider>
  );
};

const RestoreVaultPageStory = {
  title: 'Pages/Keychains/RestoreVaultPage',
  component: RestoreVaultPage,
  decorators: [
    (story) => (
      <Provider store={storeMock}>
        <MockContextProvider>
          {story()}
        </MockContextProvider>
      </Provider>
    ),
  ],
} as Meta<typeof RestoreVaultPage>;

export const DefaultStory = (args) => <RestoreVaultPage {...args} />;

DefaultStory.storyName = 'default';

DefaultStory.args = {
  createNewVaultAndRestore: createNewVaultAndRestore,
  leaveImportSeedScreenState: unMarkPasswordForgotten,
  history: {
    push: (path) => {
      console.log(`Navigated to ${path}`);
    },
  },
  isLoading: false,
};

export const LoadingState = DefaultStory.bind({});
LoadingState.args = {
  ...DefaultStory.args,
  isLoading: true,
};

export const ErrorState = DefaultStory.bind({});
ErrorState.args = {
  ...DefaultStory.args,
  error: 'An error occurred while restoring the vault.',
};

export const WithDifferentAddress = DefaultStory.bind({});
WithDifferentAddress.args = {
  ...DefaultStory.args,
  selectedAddress: '0xabcdefabcdefabcdefabcdefabcdefabcdef',
  identities: {
    '0xabcdefabcdefabcdefabcdefabcdefabcdef': {
      address: '0xabcdefabcdefabcdefabcdefabcdefabcdef',
      name: 'Account 2',
    },
  },
};

export default RestoreVaultPageStory;
