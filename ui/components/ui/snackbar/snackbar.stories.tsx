import React from 'react';
import { Meta, Story } from '@storybook/react';
import Snackbar from './snackbar.component';

export default {
  title: 'Components/UI/Snackbar',
  component: Snackbar,
  argTypes: {
    className: { control: 'text' },
    content: { control: 'text' },
  },
} as Meta;

const Template: Story = (args) => <Snackbar {...args} />;

export const DefaultSnackbar = Template.bind({});
DefaultSnackbar.args = {
  className: '',
  content: 'This is a default snackbar message.',
};

export const CustomClassSnackbar = Template.bind({});
CustomClassSnackbar.args = {
  className: 'custom-class',
  content: 'This is a snackbar with a custom class.',
};
