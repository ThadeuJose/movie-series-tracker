import React from 'react';
import { useRouteError } from 'react-router-dom';

export function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="flex flex-col items-center">
        <h1 className="font-bold text-4xl mb-16">Oops!</h1>
        <p className="mb-6 text-lg">Sorry, an unexpected error has occurred.</p>
        <p className="italic text-gray-800 font-medium text-lg">
          {error.statusText || error.message}
        </p>
      </div>
    </div>
  );
}
