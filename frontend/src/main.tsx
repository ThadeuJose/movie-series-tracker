import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import { Root } from './pages/root.tsx';
import { ErrorPage } from './pages/error.tsx';
import { MoviesPage } from './pages/movie-page.tsx';
import { Index } from './pages/index.tsx';
import {
  MovieDetailPage,
  movieDetailPageLoader,
} from './pages/movie-detail-page.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Index /> },
      {
        path: 'movies/',
        element: <MoviesPage />,
      },
      {
        path: 'movies/:id/detail',
        element: <MovieDetailPage />,
        loader: movieDetailPageLoader,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
