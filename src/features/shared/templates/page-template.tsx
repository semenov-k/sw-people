import { Container, HStack, VStack, Heading, Text } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';
import { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';

export type PageTemplateProps = {
  headerRight?: ReactNode;
};

export const PageTemplate: FC<PropsWithChildren<PageTemplateProps>> = ({ headerRight, children }) => {
  return (
    <>
      <header>
        <Container p={8} maxW="7xl">
          <HStack align="start" justify="space-between" w="100%">
            <VStack align="start">
              <Link to="/">
                <Heading color="blackAlpha.800">People of Star Wars</Heading>
              </Link>
              <Text color="gray.400">All known creatures of Star Wars universe.</Text>
            </VStack>
            {headerRight}
          </HStack>
        </Container>
      </header>
      <section>
        <Container maxW="7xl" px={8}>
          {children}
        </Container>
      </section>
    </>
  );
};
