import { createFileRoute } from '@tanstack/react-router';
import { MePage } from '../pages/me';

export const Route = createFileRoute('/_layout/me')({
  component: MePage,
});
