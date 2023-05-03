import { FC } from 'react';
import { PageTemplate } from '../templates';
import { Heading, VStack } from '@chakra-ui/react';
import image404 from '../../../assets/404.webp';

export const Page404: FC = () => (
  <PageTemplate>
    <VStack>
      <Heading mb={8} fontSize="xl" color="gray.700">
        These isn't the page you're looking for
      </Heading>
      <img src={image404} alt="404" />
    </VStack>
  </PageTemplate>
);
