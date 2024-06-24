import React from 'react';
import Snackbar from './snackbar.component';

const meta = {
  title: 'Components/ComponentLibrary/Snackbar',
  component: Snackbar,
  argTypes: {
    className: {
      control: 'text',
    },
    content: {
      control: 'text',
    },
  },
  args: {
    className: '',
    content: 'This is a snackbar message',
  },
};

export default meta;

const Template: any = (args: any) => <Snackbar {...args} />;

export const Default = Template.bind({});
Default.args = {
  className: '',
  content: 'This is a snackbar message',
};
