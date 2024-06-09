import React from 'react';
import { render } from '@testing-library/react';
import PropTypes from 'prop-types';
import TokenCurrencyDisplay from './token-currency-display.component';

describe('TokenCurrencyDisplay', () => {
  const renderComponent = (props) => render(<TokenCurrencyDisplay {...props} />);

  it('renders without crashing with valid props', () => {
    const props = {
      className: 'test-class',
      transactionData: 'test-transaction-data',
      token: {
        symbol: 'DAI',
        decimals: 18,
      },
      prefix: 'test-prefix',
    };

    const { getByText } = renderComponent(props);
    expect(getByText('DAI')).toBeInTheDocument();
  });

  it('throws a warning with invalid token prop', () => {
    const props = {
      className: 'test-class',
      transactionData: 'test-transaction-data',
      token: {
        symbol: 'DAI',
      },
      prefix: 'test-prefix',
    };

    const originalError = console.error;
    console.error = jest.fn();

    renderComponent(props);
    expect(console.error).toHaveBeenCalled();

    console.error = originalError;
  });
});
