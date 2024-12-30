import { Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

const isDevelopment = import.meta.env.DEV;

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <Outlet />
      {isDevelopment && <TanStackRouterDevtools position="bottom-right" />}
    </>
  )
}
