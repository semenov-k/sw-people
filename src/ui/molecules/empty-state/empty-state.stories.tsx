import { Meta, StoryObj } from '@storybook/react';

import { EmptyState } from './empty-state';

const meta: Meta<typeof EmptyState> = {
  title: 'UI/molecules/EmptyState',
  component: EmptyState,
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

export const Default: Story = {
  render: () => <EmptyState />,
};
