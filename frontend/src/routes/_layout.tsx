import { createFileRoute } from '@tanstack/react-router';
import { Layout } from '../pages/layout';

export const Route = createFileRoute('/_layout')({
  component: Layout,
});
