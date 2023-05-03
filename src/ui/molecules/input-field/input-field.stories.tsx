import { Meta, StoryObj } from '@storybook/react';

import { InputField } from './input-field';

const meta: Meta<typeof InputField> = {
  title: 'UI/molecules/InputField',
  component: InputField,
};

export default meta;
type Story = StoryObj<typeof InputField>;

export const Default: Story = {
  render: () => <InputField label="Name" />,
};

export const Error: Story = {
  render: () => <InputField label="Name" isError helpText="required" />,
};
