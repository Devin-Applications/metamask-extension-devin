/*
  * The addParameters and addDecorator APIs to add global decorators and parameters, exported by the various frameworks (e.g. @storybook/react) and @storybook/client were deprecated in 6.0 and have been removed in 7.0.

Instead, use export const parameters = {}; and export const decorators = []; in your .storybook/preview.js. Addon authors similarly should use such an export in a preview entry file (see Preview entries).
  * */
import React, { useEffect, createContext } from 'react';
import { action } from '@storybook/addon-actions';
import { Provider } from 'react-redux';
import configureStore from '../ui/store/store';
import '../ui/css/index.scss';
import localeList from '../app/_locales/index.json';
import * as allLocales from './locales';
import { I18nProvider, LegacyI18nProvider } from './i18n';
import MetaMetricsProviderStorybook from './metametrics';
import testData from './test-data.js';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { setBackgroundConnection } from '../ui/store/background-connection';
import { metamaskStorybookTheme } from './metamask-storybook-theme';
import { DocsContainer } from '@storybook/addon-docs';
import { useDarkMode } from 'storybook-dark-mode';
import { themes } from '@storybook/theming';

export const parameters = {
  backgrounds: {
    default: 'default',
    values: [
      { name: 'default', value: 'var(--color-background-default)' },
      { name: 'alternative', value: 'var(--color-background-alternative)' },
    ],
  },
  docs: {
    container: (context) => {
      const isDark = useDarkMode();

      const props = {
        ...context,
        theme: isDark
          ? { ...themes.dark, ...metamaskStorybookTheme }
          : { ...themes.light, ...metamaskStorybookTheme },
        'data-theme': isDark ? 'dark' : 'light',
      };

      return (
        <div data-theme={isDark ? 'dark' : 'light'}>
          <DocsContainer {...props} />
        </div>
      );
    },
  },
  options: {
    storySort: {
      order: [
        'Getting Started',
        'Foundations',
        ['Color', 'Shadow', 'Breakpoints'],
        'Components',
        ['UI', 'App', 'Component Library'],
        'Pages',
      ],
    },
  },
  controls: {
    expanded: true,
  },
};

export const globalTypes = {
  locale: {
    name: 'Locale',
    description: 'internationalization locale',
    defaultValue: 'en',
    toolbar: {
      icon: 'globe',
      items: localeList.map(({ code, name }) => {
        return { value: code, right: code, title: name };
      }),
    },
  },
};

export const getNewState = (state, props) => {
  return Object.assign(state, props);
};

export const store = configureStore(testData);
const history = createBrowserHistory();
const proxiedBackground = new Proxy(
  {},
  {
    get(_, method) {
      return function () {
        action(`Background call: ${method}`)();
        return new Promise(() => {});
      };
    },
  },
);
setBackgroundConnection(proxiedBackground);

const metamaskDecorator = (story, context) => {
  const isDark = useDarkMode();
  const currentLocale = context.globals.locale;
  const current = allLocales[currentLocale];

  useEffect(() => {
    const currentTheme = document.documentElement.getAttribute('data-theme');

    if (!currentTheme)
      document.documentElement.setAttribute('data-theme', 'light');

    if (currentTheme === 'light' && isDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else if (currentTheme === 'dark' && !isDark) {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, [isDark]);

  return (
    <Provider store={store}>
      <Router history={history}>
        <MetaMetricsProviderStorybook>
          <I18nProvider
            currentLocale={currentLocale}
            current={current}
            en={allLocales.en}
          >
            <LegacyI18nProvider>
              <MockContextProvider>
                {story()}
              </MockContextProvider>
            </LegacyI18nProvider>
          </I18nProvider>
        </MetaMetricsProviderStorybook>
      </Router>
    </Provider>
  );
};

export const decorators = [metamaskDecorator];

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
  console.log('Final translation:', translation); // Log final translation
  return <span dangerouslySetInnerHTML={{ __html: translation }} />;
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
