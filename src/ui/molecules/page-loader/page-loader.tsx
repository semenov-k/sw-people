import { Flex, Spinner } from '@chakra-ui/react';
import { FC } from 'react';

export const PageLoader: FC = () => (
  <Flex align="center" justify="center" h="400px">
    <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
  </Flex>
);
