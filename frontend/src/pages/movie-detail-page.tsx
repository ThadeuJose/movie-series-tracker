import { useEffect, useState } from 'react';
import { HttpClient } from '../api-client';
import { calculateReleaseDateDiff } from '../calculate-date';
import { IconWatch } from '../icon-watch';
import { usePageInfo } from '../usePageInfo';

export async function movieDetailPageLoader({ params }: any) {
  return { id: params.id };
}

export type MovieDetail = {
  id: number;
  title: string;
  synopsis: string;
  image: string;
  runtime: string;
  vote: number;
  release_date: string;
  cast: Cast[];
};

export type Cast = {
  id: number;
  name: string;
  image: string | undefined;
  character: string;
};

export function MovieDetailPage() {
  const { id } = usePageInfo();

  const emptyData: MovieDetail = {
    id: 0,
    title: '',
    synopsis: '',
    image: '',
    runtime: '',
    vote: 0,
    release_date: '',
    cast: [],
  };

  const [data, setData] = useState<MovieDetail>(emptyData);
  const api: HttpClient = new HttpClient();

  useEffect(() => {
    api.get<MovieDetail>(`${id}/detail`).then((response) => {
      setData(response);
    });
  }, []);

  if (data.id === 0) {
    return 'Cant Render';
  }

  return (
    <div className="grid grid-cols-[300px_minmax(900px,_1fr)] gap-4">
      <div className="">
        <img src={data.image} />
      </div>
      <div>
        <div className="flex flex-row pb-2">
          <div className="py-2 font-semibold text-2xl mr-14">{data.title}</div>
          <div className="p-2 bg-emerald-600 rounded-md font-bold text-white text-xl">
            {data.vote}
          </div>
        </div>
        <div className="flex flex-row items-center">
          <div className="mr-1 flex items-baseline">
            <IconWatch />
          </div>
          <div className="font-semibold mr-7">{data.runtime}</div>
          <div className="px-4 bg-red-700 rounded-full font-bold text-white">
            {calculateReleaseDateDiff(data.release_date, new Date())}
          </div>
        </div>
        <div className="py-10 text-xl">{data.synopsis}</div>
        <div className="font-bold text-xl mb-4">Cast</div>
        <div className="grid grid-cols-5 gap-4">
          {data.cast.map((elem) => {
            return (
              <div key={elem.id} className="col-span-1">
                <img src={elem.image} />
                <div className="text-lg font-semibold">{elem.name}</div>
                <div className="text-sm italic">{elem.character}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
