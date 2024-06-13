import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Modal from '../../modal';
import { Icon, IconName, IconSize, Text } from '../../../component-library';
import {
  IconColor,
  TextVariant,
  TextAlign,
} from '../../../../helpers/constants/design-system';

export default class TransactionConfirmed extends PureComponent {
  static contextTypes = {
    t: PropTypes.func,
  };

  static propTypes = {
    onSubmit: PropTypes.func,
    hideModal: PropTypes.func,
  };

  handleSubmit = () => {
    const { hideModal, onSubmit } = this.props;

    hideModal();

    if (onSubmit && typeof onSubmit === 'function') {
      onSubmit();
    }
  };

  render() {
    const { t } = this.context;

    return (
      <Modal onSubmit={this.handleSubmit} submitText={t('ok')}>
        <div className="transaction-confirmed__content">
          <Icon
            name={IconName.Check}
            color={IconColor.successDefault}
            size={IconSize.Xl}
          />
          <Text
            data-testid="transaction-confirmed-title"
            variant={TextVariant.headingMd}
            fontWeight={500}
            paddingTop={4}
            paddingBottom={4}
            textAlign={TextAlign.Center}
          >
            {`${t('confirmed')}!`}
          </Text>
          <Text
            data-testid="transaction-confirmed-description"
            variant={TextVariant.bodySm}
            paddingTop={4}
            paddingBottom={4}
            textAlign={TextAlign.Center}
          >
            {t('initialTransactionConfirmed')}
          </Text>
        </div>
      </Modal>
    );
  }
}
