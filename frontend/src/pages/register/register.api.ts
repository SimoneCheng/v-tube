import ky from 'ky';

type RegisterCredentials = {
  username: string;
  email: string;
  password: string;
}

type RegisterResponse = {
  id: number;
  username: string;
  email: string;
  password: string;
  createdAt: string;
}

const apiUrl = import.meta.env.VITE_API_URL;

export const postRegister = async (credentials: RegisterCredentials) => {
  const response = await ky.post('auth/register', {
    prefixUrl: apiUrl,
    json: credentials,
  }).json<RegisterResponse>();
  return response;
};
