import ky from 'ky';

type ForgotPasswordCredentials = {
  email: string;
}

type ForgotPasswordResponse = {
  message: string;
}

const apiUrl = import.meta.env.VITE_API_URL;

export const postForgotPassword = async (forgotPasswordCredentials: ForgotPasswordCredentials) => {
  const response = await ky.post('users/forgot-password', {
    prefixUrl: apiUrl,
    json: forgotPasswordCredentials,
  }).json<ForgotPasswordResponse>();
  return response;
};
