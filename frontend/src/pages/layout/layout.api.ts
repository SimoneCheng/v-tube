import ky from 'ky';

type LogoutCredentials = {
  token: string;
}

type LogoutResponse = {
  message: string;
}

export const postLogout = async ({ token }: LogoutCredentials) => {
  const response = await ky.post('/api/auth/logout', {
    headers: { 'Authorization': `Bearer ${token}` },
  }).json<LogoutResponse>();
  return response;
};
