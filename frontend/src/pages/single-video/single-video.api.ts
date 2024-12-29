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

const apiUrl = import.meta.env.VITE_API_URL;

export const getSingleVideo = async ({ id }: { id: string | number; }) => {
  const response = await ky.get(`videos/${id}`, {
    prefixUrl: apiUrl,
  }).json<Video>();
  return response;
};
