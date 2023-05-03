import {
  HStack,
  Heading,
  InputGroup,
  InputLeftElement,
  Input,
  useToast,
  Flex,
  Box,
  Card,
  CardHeader,
  CardBody,
} from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from '../../../redux';
import { InfoIcon, SearchIcon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';
import { getPersonList } from '../store';
import { throttle } from 'throttle-debounce';
import { Link } from 'react-router-dom';
import { EmptyState, PageLoader, Pagination } from '../../../ui';
import { parsePersonIdFromUrl } from '../utils';
import { PageTemplate } from '../../shared';

const PER_PAGE = 10;

export const PeopleListPage = () => {
  const toast = useToast();

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [searchInputValue, setSearchInputValue] = useState('');
  const [setSearchValue] = useState(() =>
    throttle(
      500,
      (value: string) => {
        setPage(1);
        setSearch(value);
      },
      { noLeading: true },
    ),
  );

  const { people, listIsLoading } = useAppSelector((state) => state.people);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setSearchValue(searchInputValue);
  }, [searchInputValue, setSearchValue]);

  useEffect(() => {
    const promise = dispatch(getPersonList({ page, search }));
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
  }, [dispatch, page, search, toast]);

  return (
    <PageTemplate
      headerRight={
        <InputGroup maxW="xs">
          <InputLeftElement pointerEvents="none">
            <SearchIcon />
          </InputLeftElement>
          <Input placeholder="Search" value={searchInputValue} onChange={(e) => setSearchInputValue(e.target.value)} />
        </InputGroup>
      }
    >
      {listIsLoading && <PageLoader />}
      {!listIsLoading && !!people?.results.length && (
        <>
          <Box display="grid" gridTemplateColumns="repeat(3, minmax(0, 1fr))" columnGap={8} rowGap={8} mb={8}>
            {people.results.map((person) => (
              <Link to={`/people/${parsePersonIdFromUrl(person.url)}`} key={person.url}>
                <Card variant="filled" _hover={{ background: 'gray.200' }}>
                  <CardHeader>
                    <HStack justify="space-between">
                      <Heading size="md">{person.name}</Heading>
                      <InfoIcon color="gray.600" />
                    </HStack>
                  </CardHeader>
                  <CardBody color="gray.700">
                    <div>
                      <strong>Height: </strong>
                      {person.height} SM
                    </div>
                    <div>
                      <strong>Weight: </strong>
                      {person.mass} KG
                    </div>
                  </CardBody>
                </Card>
              </Link>
            ))}
          </Box>
          {people?.count > PER_PAGE && (
            <Flex justify="end">
              <Pagination
                currentPage={page}
                totalPages={Math.ceil(people.count / PER_PAGE)}
                siblingsCount={1}
                onPageChange={setPage}
              />
            </Flex>
          )}
        </>
      )}
      {!listIsLoading && people?.results.length === 0 && <EmptyState />}
    </PageTemplate>
  );
};
