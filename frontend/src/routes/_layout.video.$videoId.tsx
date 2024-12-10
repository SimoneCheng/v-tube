import { SingleVideoPage } from '../pages/single-video';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_layout/video/$videoId')({
  component: SingleVideoPage
});
