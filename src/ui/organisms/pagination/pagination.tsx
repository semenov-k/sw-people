import { FC, useMemo } from 'react';
import { DOTS, getPaginationModel } from './utils';
import { Button, ButtonGroup } from '@chakra-ui/react';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  siblingsCount?: number;
  onPageChange: (page: number) => void;
};

export const Pagination: FC<PaginationProps> = ({ currentPage, totalPages, siblingsCount = 3, onPageChange }) => {
  const paginationModel = useMemo(
    () => getPaginationModel(currentPage, totalPages, siblingsCount),
    [currentPage, totalPages, siblingsCount],
  );

  return (
    <ButtonGroup>
      {paginationModel.map((pageNum, index) => (
        <Button
          key={index}
          isDisabled={pageNum === DOTS}
          isActive={pageNum === currentPage}
          onClick={() => {
            if (pageNum !== DOTS) {
              onPageChange(pageNum as number);
            }
          }}
        >
          {pageNum}
        </Button>
      ))}
    </ButtonGroup>
  );
};
