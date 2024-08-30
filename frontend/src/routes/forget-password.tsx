import { createFileRoute } from '@tanstack/react-router';
import { ForgetPasswordPage } from '../pages/forget-password';

export const Route = createFileRoute('/forget-password')({
  component: ForgetPasswordPage
});
