import ky from 'ky';

type LoginCredentials = {
  email: string;
  password: string;
}

type LoginResponse = {
  accessToken: string;
}

export const postLogin = async ({ email, password }: LoginCredentials) => {
  const response = await ky.post('/api/auth/login', {
    json: { email, password },
  }).json<LoginResponse>();
  return response;
};
