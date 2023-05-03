import { Meta, StoryObj } from '@storybook/react';

import { PageLoader } from './page-loader';

const meta: Meta<typeof PageLoader> = {
  title: 'UI/molecules/PageLoader',
  component: PageLoader,
};

export default meta;
type Story = StoryObj<typeof PageLoader>;

export const Default: Story = {
  render: () => <PageLoader />,
};
