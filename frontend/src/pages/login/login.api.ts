import ky from 'ky';

type LoginCredentials = {
  email: string;
  password: string;
}

type LoginResponse = {
  accessToken: string;
}

const apiUrl = import.meta.env.VITE_API_URL;

export const postLogin = async ({ email, password }: LoginCredentials) => {
  const response = await ky.post('auth/login', {
    prefixUrl: apiUrl,
    json: { email, password },
  }).json<LoginResponse>();
  return response;
};
