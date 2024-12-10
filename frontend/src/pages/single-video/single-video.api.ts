import ky from "ky";

type Video = {
  id: number;
  title: string;
  description: string;
  url: string;
  views: number;
  uploadedAt: string;
  uploader: {
    id: number;
    username: string;
  };
};

export const getSingleVideo = async ({ id }: { id: string | number; }) => {
  const response = await ky.get(`/api/videos/${id}`).json<Video>();
  return response;
};
