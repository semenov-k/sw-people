import { range } from 'ramda';

export const DOTS = '...';

export const getPaginationModel = (
  currentPage: number,
  totalPageCount: number,
  siblingCount: number,
): (number | string)[] => {
  // firstPage + DOTS + siblings + currentPage + siblings + DOTS + last page
  const maxNumberOfElements = siblingCount * 2 + 5;

  // Case 1: [1, 2, 3, 4, 5]
  if (totalPageCount <= maxNumberOfElements) {
    return range(1, totalPageCount + 1);
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount);

  const shouldShowLeftDots = leftSiblingIndex > 2;
  const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;
  const firstPageIndex = 1;
  const lastPageIndex = totalPageCount;

  // Case 2: [1, 2, 3, ..., 100]
  if (!shouldShowLeftDots && shouldShowRightDots) {
    const leftItemCount = 3 + 2 * siblingCount;
    const leftRange = range(1, leftItemCount + 1);

    return [...leftRange, DOTS, totalPageCount];
  }

  // Case 3: [1, ..., 98, 99, 100]
  if (shouldShowLeftDots && !shouldShowRightDots) {
    const rightItemCount = 3 + 2 * siblingCount;
    const rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount + 1);

    return [firstPageIndex, DOTS, ...rightRange];
  }

  // Case 4: [1, ..., 49, 50, 51, ..., 100]
  const middleRange = range(leftSiblingIndex, rightSiblingIndex + 1);

  return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
};
