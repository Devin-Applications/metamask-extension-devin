import React from 'react';
import { Meta } from '@storybook/react';
import UnitInput from './unit-input.component';

const UnitInputStory = {
  title: 'Components/UI/UnitInput',
  component: UnitInput,
  argTypes: {
    value: { control: 'text' },
    onChange: { action: 'changed' },
  },
} as Meta<typeof UnitInput>;

export const DefaultStory = (args) => <UnitInput {...args} />;

DefaultStory.storyName = 'default';

DefaultStory.args = {
  value: '100',
};

export default UnitInputStory;
