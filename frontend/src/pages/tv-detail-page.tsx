import { useEffect, useState } from 'react';
import { HttpClient } from '../api-client';
import { calculateReleaseDateDiff } from '../calculate-date';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import { usePageInfo } from '../usePageInfo';
import { Runtime } from '../components/runtime';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function tvDetailPageLoader({ params }: any) {
  return { id: params.id };
}

export type TvDetail = {
  detail: Detail;
  season: Season;
  cast: Cast[];
};

export interface Detail {
  id: number;
  title: string;
  vote: number;
  image: string | null;
  last_episode_to_air: Episode | null;
  next_episode_to_air: Episode | null;
  synopsis: string;
}

export interface Season {
  id: number;
  name: string;
  vote: number;
  episodes: Episode[];
}

export interface Episode {
  id: number;
  name: string;
  number: number;
  image: string | null;
  runtime: number;
  air_date: string | null;
}

export type Cast = {
  id: number;
  name: string;
  image: string | null;
  character: string;
};

export function TvDetailPage() {
  const { id } = usePageInfo();

  const [data, setData] = useState<TvDetail | null>(null);
  const api: HttpClient = new HttpClient();

  useEffect(() => {
    api.get<TvDetail>(`tv/${id}/detail`).then((response) => {
      console.log(response);
      setData(response);
    });
  }, []);

  if (!data) {
    return <>Cant Render</>;
  }

  const last_episode_to_air: Episode | null = data.detail.last_episode_to_air;
  const next_episode_to_air: Episode | null = data.detail.next_episode_to_air;

  return (
    <div>
      <div className="grid grid-cols-[300px_minmax(900px,_1fr)] gap-4">
        <Image src={data.detail.image} />
        <div className="flex flex-col">
          <div className="flex flex-row pb-2">
            <div className="py-2 font-semibold text-2xl mr-14">
              {data.detail.title}
            </div>
            <div className="p-2 bg-emerald-600 rounded-md font-bold text-white text-xl">
              {data.detail.vote}
            </div>
          </div>
          <div className="text-xl">{data.detail.synopsis}</div>
          <div className="mt-auto">
            {last_episode_to_air && <Episode {...last_episode_to_air} />}
            {next_episode_to_air && <Episode {...next_episode_to_air} />}
          </div>
        </div>
      </div>

      <div className="my-4">
        <div className="flex flex-row items-center">
          <div className="font-bold text-xl mr-5">{data.season.name}</div>
          <div className="bg-emerald-600 rounded-md font-bold text-white p-2">
            {data.season.vote}
          </div>
        </div>

        <Carousel episodes={data.season.episodes} />
      </div>
      <div className="font-bold text-xl mb-4">Cast</div>
      <div className="grid grid-cols-5 gap-4">
        {data.cast.map((elem) => {
          return (
            <div key={elem.id} className="col-span-1">
              <Image src={elem.image} />
              <div className="text-lg font-semibold">{elem.name}</div>
              <div className="text-sm italic">{elem.character}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface EpisodeProps {
  name: string;
  number: number;
  image: string | null;
  runtime: number;
  air_date: string | null;
}

function Episode({ name, number, image, runtime, air_date }: EpisodeProps) {
  return (
    <div className={`w-[300px]`}>
      <div className="flex flex-row font-semibold">
        <div className="truncate w-10/12">{name}</div>
        <div className="ml-auto ">{number}</div>
      </div>
      <Image className="my-2  w-[300px] h-[170px]" src={image} />
      <div className="flex flex-row">
        {air_date && (
          <div>{calculateReleaseDateDiff(air_date, new Date())}</div>
        )}
        <Runtime className="ml-auto" runtime={runtime} />
      </div>
    </div>
  );
}

interface ImageProps {
  className?: string;
  src: string | null;
}

function Image({ className, src }: ImageProps) {
  if (src) {
    return <img className={className} src={src} />;
  }
}

interface CarouselProps {
  episodes: Episode[];
}

function Carousel({ episodes }: CarouselProps) {
  const [sliderRef, instanceRef] = useKeenSlider({
    slides: {
      perView: 'auto',
      spacing: 15,
    },
  });

  return (
    <div ref={sliderRef} className="keen-slider">
      {episodes.map((elem) => (
        <div key={elem.id} className="min-w-[300px] keen-slider__slide">
          <Episode {...elem} />
        </div>
      ))}
    </div>
  );
}
