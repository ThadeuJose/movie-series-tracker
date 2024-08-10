import { useLoaderData } from 'react-router-dom';
import type { PageInfo } from './types';

export function usePageInfo() {
  const { id } = useLoaderData() as PageInfo;
  return { id };
}
