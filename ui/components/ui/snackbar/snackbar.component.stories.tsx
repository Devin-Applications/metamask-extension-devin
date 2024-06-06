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

const Template: Story<{ className: string; content: string }> = (args) => <Snackbar {...args} />;

export const Default = Template.bind({});
Default.args = {
  className: '',
  content: 'This is a default snackbar message',
};

export const CustomClass = Template.bind({});
CustomClass.args = {
  className: 'custom-snackbar',
  content: 'This is a snackbar with a custom class',
};

export const LongTextContent = Template.bind({});
LongTextContent.args = {
  className: '',
  content: 'This is a snackbar with a very long text content to test text wrapping or overflow behavior. This message should be long enough to trigger any text overflow handling in the component.',
};

export const HTMLContent = Template.bind({});
HTMLContent.args = {
  className: '',
  content: <strong>This is a snackbar with HTML content</strong>,
};

export const WarningSnackbar = Template.bind({});
WarningSnackbar.args = {
  className: 'warning-snackbar',
  content: 'This is a warning snackbar message',
};

export const ErrorSnackbar = Template.bind({});
ErrorSnackbar.args = {
  className: 'error-snackbar',
  content: 'This is an error snackbar message',
};
