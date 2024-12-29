import ky from 'ky';

type LogoutCredentials = {
  token: string;
}

type LogoutResponse = {
  message: string;
}

const apiUrl = import.meta.env.VITE_API_URL;

export const postLogout = async ({ token }: LogoutCredentials) => {
  const response = await ky.post('auth/logout', {
    prefixUrl: apiUrl,
    headers: { 'Authorization': `Bearer ${token}` },
  }).json<LogoutResponse>();
  return response;
};
