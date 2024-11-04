import './tailwind.css';

import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from '@remix-run/react';

const GTM_ID = 'G-VS1SXFV4EW';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GTM_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: [
              ` window.dataLayer = window.dataLayer || [];`,
              `function gtag(){dataLayer.push(arguments);}`,
              `gtag('js', new Date());`,
              `gtag('config', '${GTM_ID}', { page_path: window.location.pathname });`
            ].join('\n')
          }}
        />
        <Meta />
        <Links />
      </head>
      <body className={`relative`}>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
