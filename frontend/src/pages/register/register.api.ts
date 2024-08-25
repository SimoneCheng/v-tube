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
}

export const postRegister = async (credentials: RegisterCredentials) => {
  const response = await ky.post('/api/auth/register', {
    json: credentials,
  }).json<RegisterResponse>();
  return response;
};
