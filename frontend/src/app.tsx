import React, { useEffect, useState } from 'react';
import { IconBookmark } from './icon-bookmark';
import axios from 'axios';

const baseURL = 'http://localhost:3000';

interface Movie {
  title: string;
  vote: number;
  image: string;
}

function App() {
  const [data, setData] = useState<Movie[]>([]);

  useEffect(() => {
    axios
      .get(baseURL)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  if (!data) return 'Cant Render';

  return (
    <>
      <IconBookmark />
      <h1 className="text-3xl font-bold underline ">Hello world!</h1>
      <div className="max-h-full max-w-full min-w-0 min-h-0 grid grid-cols-4 gap-4 m-4">
        {data.map((item: Movie, index: number) => (
          <div key={index} className="h-full w-fit">
            <img src={item.image} />
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
