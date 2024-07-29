import React, { useEffect, useState } from 'react';
import { IconPlanToWatch } from './icon-plan-to-watch';
import { HttpClient } from './api-client';
import { IconStar } from './icon-star';
import { IconWatched } from './icon-watched';

type Result = {
  page: number;
  results: Movie[];
  total_pages: number;
};

interface Movie {
  id: number;
  title: string;
  vote: number;
  image: string;
}

function App() {
  const emptyData = {
    page: 0,
    results: [],
    total_pages: 0,
  };
  const [data, setData] = useState<Result>(emptyData);
  const [dataPlan, setDataPlan] = useState<number[]>([]);
  const [dataWatched, setDataWatched] = useState<number[]>([]);
  const api: HttpClient = new HttpClient();

  useEffect(() => {
    api.get<Result>('1').then((response) => {
      setData(response);
    });
  }, []);

  function updatePlan(id: number, title: string) {
    type payloadType = {
      id: number;
      title: string;
    };

    api
      .post<number[], payloadType>('/user/planning', {
        id,
        title,
      })
      .then(function (response) {
        setDataPlan(response);
      });
  }

  function formatDate(date: Date): string {
    //YYYY-MM-DD HH:MM
    const formatNumber = (n: number) => String(n).padStart(2, '0');

    return `${String(date.getFullYear())}-${formatNumber(
      date.getMonth() + 1,
    )}-${formatNumber(date.getDate())} ${formatNumber(
      date.getHours(),
    )}:${formatNumber(date.getMinutes())}`;
  }

  function updateWatched(id: number, title: string) {
    type payloadType = {
      id: number;
      title: string;
      date: string;
    };

    api
      .post<number[], payloadType>('/user/watched', {
        id,
        title,
        date: formatDate(new Date()),
      })
      .then(function (response) {
        setDataWatched(response);
      });
  }

  const paginationIconsClass: string = 'cursor-pointer px-4 py-2';

  if (data.page === 0) return 'Cant Render';

  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <div className="max-h-full max-w-full min-w-0 min-h-0 grid grid-cols-4 gap-4 m-4">
        {data.results.map((item: Movie) => (
          <div key={item.id} className="h-full w-fit flex">
            <div
              data-cy={`Poster-${item.id}`}
              className="relative w-[300px] h-[450px]"
              style={{
                backgroundImage: `url(${item.image})`,
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            >
              <div className="absolute inset-0 bg-black opacity-70 z-0 flex items-center justify-center">
                <div className="text-white text-3xl text-center px-4 py-2">
                  {item.title}
                </div>
              </div>
              <div className="flex mt-2 mx-2">
                <div>
                  <div className="flex relative">
                    <IconStar />
                    <div className="bg-black text-white text-xl my-auto px-2 pb-1 left-8 absolute top-1/2 -translate-y-1/2 rounded-r-xl">
                      {item.vote}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col ml-auto">
                  <IconPlanToWatch
                    dataCy={`IconPlanToWatch-${item.id}`}
                    isInList={dataPlan.indexOf(item.id) !== -1}
                    onClick={() => updatePlan(item.id, item.title)}
                  />
                  <IconWatched
                    index={item.id}
                    watched={dataWatched.indexOf(item.id) !== -1}
                    onClick={() => {
                      updateWatched(item.id, item.title);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="m-auto flex flex-row justify-center items-center my-6 border border-black rounded-lg w-fit">
        <span
          data-cy={`IconPreviousPage`}
          className={paginationIconsClass + ' border-r border-black'}
          onClick={() => {
            api.get<Result>(String(data.page - 1)).then((response) => {
              setData(response);
            });
          }}
        >
          Previous
        </span>
        <span data-cy="PageNumber" className="px-3">
          {data.page}
        </span>
        <span
          data-cy={`IconNextPage`}
          className={paginationIconsClass + ' border-l border-black'}
          onClick={() => {
            api.get<Result>(String(data.page + 1)).then((response) => {
              setData(response);
            });
          }}
        >
          Next
        </span>
      </div>
    </>
  );
}

export default App;
