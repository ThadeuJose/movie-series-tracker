import React, { useEffect, useState } from 'react';
import { IconPlanToWatch } from './icon-plan-to-watch';
import axios from 'axios';

const baseURL = 'http://localhost:3000';

interface Movie {
  id: number;
  title: string;
  vote: number;
  image: string;
}

function App() {
  const [data, setData] = useState<Movie[]>([]);
  const [dataPlan, setDataPlan] = useState<number[]>([]);

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

  function updatePlan(id: number, title: string) {
    axios
      .post(baseURL + '/user/planning', {
        id,
        title,
      })
      .then(function (response) {
        setDataPlan(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  if (data.length === 0) return 'Cant Render';

  return (
    <>
      <h1 className="text-3xl font-bold underline ">Hello world!</h1>
      <div className="max-h-full max-w-full min-w-0 min-h-0 grid grid-cols-4 gap-4 m-4">
        {data.map((item: Movie) => (
          <div key={item.id} className="h-full w-fit flex">
            <div
              className="w-[300px] h-[450px]"
              style={{
                backgroundImage: `url(${item.image})`,
              }}
            >
              <IconPlanToWatch
                dataCy={`IconPlanToWatch-${item.id}`}
                isInList={dataPlan.indexOf(item.id) !== -1}
                onClick={() => updatePlan(item.id, item.title)}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
