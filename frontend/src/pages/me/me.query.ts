import { useQuery } from '@tanstack/react-query';
import { getMe } from './me.api';

export const useGetMeQuery = () => {
  const token = localStorage.getItem('token') as string;
  return useQuery({
    queryKey: ["me"],
    queryFn: () => getMe({ token }),
    enabled: !!token,
  })
};
