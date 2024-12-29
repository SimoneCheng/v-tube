import ky from 'ky';

export type MeCredentials = {
  token: string;
}

export type MeResponse = {
  id: number;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export type Video = {
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

export type UploadVideoRequest = {
  file: File;
  title: string;
  description: string;
  token: string;
};

const apiUrl = import.meta.env.VITE_API_URL;

export const getMe = async ({ token }: MeCredentials) => {
  const response = await ky.get('auth/me', {
    prefixUrl: apiUrl,
    headers: { 'Authorization': `Bearer ${token}` },
  }).json<MeResponse>();
  return response;
};

export const getUserVideos = async ({ userId, token }: { userId: number; token: string; }) => {
  const response = await ky.get(`videos/user/${userId}`, {
    prefixUrl: apiUrl,
    headers: { 'Authorization': `Bearer ${token}` },
  }).json<Video[]>();
  return response;
};

export const uploadVideo = async ({ file, title, description, token }: UploadVideoRequest) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('title', title);
  formData.append('description', description);

  const response = await ky.post('videos/upload', {
    prefixUrl: apiUrl,
    headers: { 'Authorization': `Bearer ${token}` },
    body: formData,
  }).json<Video>();
  return response;
};
