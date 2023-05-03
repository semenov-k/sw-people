import { FC, PropsWithChildren } from 'react';
import { HStack, Text } from '@chakra-ui/react';

export type PersonInfoItemProps = {
  name: string;
};

export const PersonInfoItem: FC<PropsWithChildren<PersonInfoItemProps>> = ({ name, children }) => (
  <HStack columnGap={2}>
    <Text color="gray.600">{name}:</Text>
    <Text>{children}</Text>
  </HStack>
);
