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

export const getMe = async ({ token }: MeCredentials) => {
  const response = await ky.get('/api/auth/me', {
    headers: { 'Authorization': `Bearer ${token}` },
  }).json<MeResponse>();
  return response;
};
