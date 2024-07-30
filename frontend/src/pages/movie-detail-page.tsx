import React from 'react';
import { useLoaderData } from 'react-router-dom';

export async function movieDetailPageLoader({ params }: any) {
  return { id: params.id };
}

export function MovieDetailPage() {
  const { id } = useLoaderData();

  return <>{id}</>;
}
