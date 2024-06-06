import React from 'react';
import { Meta, Story } from '@storybook/react';
import IconButton from './icon-button';
import { TextVariant } from '../../../helpers/constants/design-system';
import Tooltip from '../tooltip/tooltip';

export default {
  title: 'Components/UI/IconButton',
  component: IconButton,
  argTypes: {
    onClick: { action: 'clicked' },
    Icon: { control: 'object' },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
    tooltipRender: { control: 'function' },
    className: { control: 'text' },
    'data-testid': { control: 'text' },
  },
} as Meta<typeof IconButton>;

const Template: Story<typeof IconButton> = (args) => <IconButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  onClick: () => alert('Button clicked!'),
  Icon: <div>Icon</div>,
  disabled: false,
  label: 'Button Label',
  tooltipRender: (inner) => <Tooltip title="Tooltip">{inner}</Tooltip>,
  className: '',
  'data-testid': 'icon-button',
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...Default.args,
  disabled: true,
};

export const WithLongLabel = Template.bind({});
WithLongLabel.args = {
  ...Default.args,
  label: 'This is a very long label that should trigger the tooltip',
};
