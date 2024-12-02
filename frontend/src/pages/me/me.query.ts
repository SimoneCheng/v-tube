import {
  useQuery,
  useMutation,
  useQueryClient
} from '@tanstack/react-query';
import {
  getMe,
  getUserVideos,
  uploadVideo,
  type UploadVideoRequest
} from './me.api';

const token = localStorage.getItem('token') as string;

export const useGetMeQuery = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: () => getMe({ token }),
    enabled: !!token,
  })
};

export const useGetUserVideosQuery = (userId: number) => {
  return useQuery({
    queryKey: ['userVideos', userId],
    queryFn: () => getUserVideos({ userId, token }),
    enabled: !!token && !!userId,
  });
};

export const useUploadVideoMutation = ({ userId }: { userId: number; }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Omit<UploadVideoRequest, 'token'>) =>
      uploadVideo({ ...data, token }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userVideos', userId] });
    },
  });
};
