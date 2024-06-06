import React from 'react';
import { Meta, Story } from '@storybook/react';
import IconButton from './icon-button';
import { TextVariant } from '../../../helpers/constants/design-system';
import Tooltip from '../tooltip/tooltip';

// Define the default export for the story
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

// Define a template for the stories
const Template: Story<typeof IconButton> = (args) => <IconButton {...args} />;

// Default story
export const Default = Template.bind({});
Default.args = {
  onClick: () => {},
  Icon: <div>Icon</div>,
  disabled: false,
  label: 'Default Label',
  tooltipRender: undefined,
  className: '',
  'data-testid': 'icon-button-default',
};

// Disabled state story
export const Disabled = Template.bind({});
Disabled.args = {
  ...Default.args,
  disabled: true,
  label: 'Disabled Label',
};

// With Tooltip story
export const WithTooltip = Template.bind({});
WithTooltip.args = {
  ...Default.args,
  label: 'Label with Tooltip',
  tooltipRender: (inner) => <Tooltip title="Tooltip">{inner}</Tooltip>,
};

// Long Label story
export const LongLabel = Template.bind({});
LongLabel.args = {
  ...Default.args,
  label: 'This is a very long label that should trigger the tooltip',
};
