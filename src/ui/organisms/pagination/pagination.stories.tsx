import { Meta, StoryObj } from '@storybook/react';

import { Pagination } from './pagination';
import { Button } from '@chakra-ui/react';
import { useState } from 'react';

const meta: Meta<typeof Pagination> = {
  title: 'UI/organisms/Pagination',
  component: Pagination,
};

export default meta;
type Story = StoryObj<typeof Button>;

const PaginationWithState = () => {
  const [page, setPage] = useState(1);

  return <Pagination currentPage={page} onPageChange={setPage} totalPages={15} siblingsCount={3} />;
};

export const Default: Story = {
  render: () => <PaginationWithState />,
};
