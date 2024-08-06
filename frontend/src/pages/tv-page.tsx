import React, { useEffect, useState } from 'react';
import { HttpClient } from '../api-client';
import { Grid } from '../components/grid';
import { IconPlanToWatch } from '../icon-plan-to-watch';
import { IconWatched } from '../icon-watched';
import { Pagination } from '../components/pagination';

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
  const emptyData = {
    page: 0,
    results: [],
    total_pages: 0,
  };
  const [data, setData] = useState<Result>(emptyData);
  const api: HttpClient = new HttpClient();

  const getPage = (page: number) => api.get<Result>(`/tv?page=${page}`);

  useEffect(() => {
    getPage(1).then((response) => {
      setData(response);
    });
  }, []);

  function nextPage() {
    getPage(data.page + 1).then((response) => {
      setData(response);
    });
  }

  function previousPage() {
    getPage(data.page - 1).then((response) => {
      setData(response);
    });
  }

  if (data.page === 0) return 'Cant Render';

  return (
    <>
      <Grid.Root>
        {data.results.map((item) => (
          <Grid.Card key={item.id}>
            <Grid.Poster {...item}>
              {/* Link to */}
              <Grid.Title {...item} />
              {/* Link to */}
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
        <Pagination.PageNumber page={data.page} />
        <Pagination.PageNavButton iconType="Next" onClick={nextPage} />
      </Pagination.Root>
    </>
  );
}
