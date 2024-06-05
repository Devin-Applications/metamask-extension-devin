import React from 'react';
import { Meta, Story } from '@storybook/react';
import IconButton from './icon-button';
import { TextVariant } from '../../../helpers/constants/design-system';
import Tooltip from '../tooltip/tooltip';

interface IconButtonProps {
  onClick: () => void;
  Icon: React.ReactNode;
  disabled?: boolean;
  label: string;
  tooltipRender?: (content: React.ReactNode) => React.ReactNode;
  className?: string;
}

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
} as Meta<IconButtonProps>;

const Template: Story<IconButtonProps> = (args) => <IconButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  onClick: () => {},
  Icon: <div>Icon</div>,
  disabled: false,
  label: 'Button',
  tooltipRender: (content) => <Tooltip title="Tooltip">{content}</Tooltip>,
  className: '',
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...Default.args,
  disabled: true,
};

export const WithLongLabel = Template.bind({});
WithLongLabel.args = {
  ...Default.args,
  label: 'This is a very long label',
};
