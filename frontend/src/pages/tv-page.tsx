import { useState } from 'react';
import { HttpClient } from '../api-client';
import { Grid } from '../components/grid';
import { IconPlanToWatch } from '../icon-plan-to-watch';
import { IconWatched } from '../icon-watched';
import { Pagination } from '../components/pagination';
import { Link } from 'react-router-dom';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

type Result = {
  page: number;
  results: Tv[];
  total_pages: number;
};

interface Tv {
  id: number;
  title: string;
  vote: number;
  image: string;
}

export function TvPage() {
  const api: HttpClient = new HttpClient();

  function getTvPage(page: number): Promise<Result> {
    return api.get<Result>(`/tv?page=${page}`);
  }

  const [page, setPage] = useState<number>(1);

  const { data, isLoading, isFetching, isError, error, isPlaceholderData } =
    useQuery({
      queryKey: ['tv', page],
      queryFn: () => getTvPage(page),
      placeholderData: keepPreviousData,
    });

  function nextPage() {
    const total_pages = data?.total_pages ?? 0;
    if (!isPlaceholderData && page + 1 < total_pages) {
      setPage((old) => old + 1);
    }
  }

  function previousPage() {
    setPage((old) => Math.max(old - 1, 1));
  }

  if (isError) throw error;

  if (isLoading || isFetching) return 'Loading';

  return (
    <>
      <Grid.Root>
        {data?.results.map((item) => (
          <Grid.Card key={item.id}>
            <Grid.Poster {...item}>
              <Link to={`${item.id}/detail`}>
                <Grid.Title {...item} />
              </Link>
              <Grid.Header>
                <Grid.Rating {...item} />
                <Grid.IconsTray>
                  <IconPlanToWatch
                    dataCy={`IconPlanToWatch-${item.id}`}
                    isInList={false}
                    onClick={() => {}}
                  />
                  <IconWatched
                    index={item.id}
                    watched={false}
                    onClick={() => {}}
                  />
                </Grid.IconsTray>
              </Grid.Header>
            </Grid.Poster>
          </Grid.Card>
        ))}
      </Grid.Root>
      <Pagination.Root>
        <Pagination.PageNavButton iconType="Previous" onClick={previousPage} />
        <Pagination.PageNumber page={data?.page ?? 0} />
        <Pagination.PageNavButton iconType="Next" onClick={nextPage} />
      </Pagination.Root>
    </>
  );
}
