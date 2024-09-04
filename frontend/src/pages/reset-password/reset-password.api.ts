import ky from 'ky';

type ResetPasswordCredentials = {
  token: string;
  newPassword: string;
};

type ResetPasswordResponse = {
  message: string;
}

export const postResetPassword = async (resetPasswordCredentials: ResetPasswordCredentials) => {
  const response = await ky.post('/api/users/reset-password', {
    json: resetPasswordCredentials
  }).json<ResetPasswordResponse>();
  return response;
};
