import { FC, useCallback, useEffect } from 'react';
import { PageTemplate } from '../../shared';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Card,
  CardBody,
  VStack,
  Heading,
  useToast,
  Box,
  HStack,
  IconButton,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
} from '@chakra-ui/react';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux';
import { EmptyState, PageLoader } from '../../../ui';
import { getPerson, updateCurrentPerson } from '../store';
import { PersonInfoItem } from '../molecules';
import { EditIcon } from '@chakra-ui/icons';
import { PersonEditForm } from '../organisms';
import { PersonDto } from '../dto';

const EDIT_FORM_ID = 'edit_form_id';

export const PeopleDetailPage: FC = () => {
  const { personId } = useParams<{ personId: string }>();

  const toast = useToast();
  const drawerState = useDisclosure();

  const { detailsIsLoading, person } = useAppSelector((state) => state.people);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const promise = dispatch(getPerson({ id: personId }));
    promise.unwrap().catch((reason) => {
      if (reason.name === 'AbortError') return;

      toast({
        title: 'Unable to fetch data',
        status: 'error',
      });
    });

    return () => {
      promise.abort();
    };
  }, [dispatch, personId, toast]);

  const handleEditFormSubmit = useCallback(
    (data: Omit<PersonDto, 'url'>) => {
      drawerState.onClose();
      dispatch(updateCurrentPerson({ person: data }));

      toast({
        title: 'Changes was saved successfully',
        status: 'success',
      });
    },
    [dispatch, drawerState, toast],
  );

  return (
    <PageTemplate>
      <Breadcrumb mb={8}>
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} to="/">
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink>{person?.name || 'Unknown'}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      {detailsIsLoading && <PageLoader />}
      {!detailsIsLoading && person && (
        <>
          <VStack align="stretch" rowGap={4}>
            <HStack justify="space-between">
              <Heading color="gray.700">{person.name}</Heading>
              <IconButton
                colorScheme="blue"
                aria-label="edit person"
                icon={<EditIcon />}
                onClick={drawerState.onOpen}
              />
            </HStack>
            <Card variant="outline">
              <CardBody>
                <Box display="grid">
                  <PersonInfoItem name="Height">{person.height}</PersonInfoItem>
                  <PersonInfoItem name="Mass">{person.mass}</PersonInfoItem>
                  <PersonInfoItem name="Hair color">{person.hairColor}</PersonInfoItem>
                  <PersonInfoItem name="Skin color">{person.skinColor}</PersonInfoItem>
                  <PersonInfoItem name="Eye color">{person.eyeColor}</PersonInfoItem>
                  <PersonInfoItem name="Birth year">{person.birthYear}</PersonInfoItem>
                </Box>
              </CardBody>
            </Card>
          </VStack>
          <Drawer isOpen={drawerState.isOpen} placement="right" onClose={drawerState.onClose}>
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Edit person</DrawerHeader>
              <DrawerBody>
                <PersonEditForm initialData={person} onSubmit={handleEditFormSubmit} formId={EDIT_FORM_ID} />
              </DrawerBody>
              <DrawerFooter>
                <Button variant="outline" mr={3} onClick={drawerState.onClose}>
                  Cancel
                </Button>
                <Button colorScheme="blue" type="submit" form={EDIT_FORM_ID}>
                  Save
                </Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </>
      )}
      {!detailsIsLoading && !person && <EmptyState />}
    </PageTemplate>
  );
};
