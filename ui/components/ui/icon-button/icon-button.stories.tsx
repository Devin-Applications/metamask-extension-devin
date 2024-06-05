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
  },
} as Meta<typeof IconButton>;

const Template: Story<typeof IconButton> = (args) => <IconButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  onClick: () => {},
  Icon: <div>Icon</div>,
  disabled: false,
  label: 'Button',
  tooltipRender: undefined,
  className: '',
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...Default.args,
  disabled: true,
};

export const WithTooltip = Template.bind({});
WithTooltip.args = {
  ...Default.args,
  label: 'Button with Tooltip',
  tooltipRender: (inner) => (
    <Tooltip title="Tooltip" position="bottom">
      {inner}
    </Tooltip>
  ),
};
