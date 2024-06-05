import React from 'react';
import { Meta, Story } from '@storybook/react';
import Snackbar from './snackbar.component';

export default {
  title: 'Components/Snackbar',
  component: Snackbar,
  argTypes: {
    className: { control: 'text' },
    content: { control: 'text' },
  },
} as Meta;

const Template: Story = (args) => <Snackbar {...args} />;

export const Default = Template.bind({});
Default.args = {
  className: '',
  content: 'This is a default snackbar message',
};

export const CustomClass = Template.bind({});
CustomClass.args = {
  className: 'custom-class',
  content: 'This is a snackbar with a custom class',
};
