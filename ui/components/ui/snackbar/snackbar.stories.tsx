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

const Template: Story = (args) => <Snackbar {...args} content={args.content} />;

export const Default = Template.bind({});
Default.args = {
  className: '',
  content: 'This is a default snackbar message',
};

export const WithCustomClass = Template.bind({});
WithCustomClass.args = {
  className: 'custom-class',
  content: 'This snackbar has a custom class',
};

export const LongContent = Template.bind({});
LongContent.args = {
  className: '',
  content: 'This is a snackbar message with a very long content to showcase how it handles various lengths of text. This should be displayed properly without any issues.',
};

export const SpecialCharacters = Template.bind({});
SpecialCharacters.args = {
  className: '',
  content: 'This snackbar contains special characters: !@#$%^&*()_+{}:"<>?[];\',./`~',
};

// Additional story test cases to be implemented:
// 1. Snackbar with different content lengths to showcase how it handles various lengths of text.
// 2. Snackbar with different class names to demonstrate the ability to customize its appearance.
// 3. Snackbar with special characters in the content to test its rendering capabilities.
