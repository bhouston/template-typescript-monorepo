import { HelloWorld } from '@bhouston/react-lib';
import { createFileRoute } from '@tanstack/react-router';

const HomePage: React.FC = () => {
  const { apiHealthy } = Route.useLoaderData();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <HelloWorld name="@TanStack/Start">
        {apiHealthy ? (
          <p className="text-green-500">Local TanStack StartAPI is healthy</p>
        ) : (
          <p className="text-red-500">
            Local TanStack Start API is NOT healthy
          </p>
        )}
      </HelloWorld>
    </div>
  );
};

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      {
        title: "Ben Houston's TypeScript Monorepo Template",
      },
      {
        name: 'description',
        content: 'A generic Typescript mono-repo illustrating best practices.',
      },
    ],
  }),
  loader: async () => {
    const url = new URL(
      '/api/health',
      `http://localhost:${process.env.PORT ?? '3000'}`,
    );
    const apiHealthy = await fetch(url.toString())
      .then((res) => res.ok)
      .catch(() => false);
    return { apiHealthy };
  },
  component: HomePage,
});
