import ky from 'ky';

type ForgotPasswordCredentials = {
  email: string;
}

type ForgotPasswordResponse = {
  message: string;
}

export const postForgotPassword = async (forgotPasswordCredentials: ForgotPasswordCredentials) => {
  const response = await ky.post('/api/users/forgot-password', {
    json: forgotPasswordCredentials,
  }).json<ForgotPasswordResponse>();
  return response;
};
