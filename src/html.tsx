import App, { type SSProps } from "@/App";
import type React from "react";
import { renderToString } from "react-dom/server";

export type HtmlProps = {
  appHtml?: React.ReactNode;
  initialData?: any;
};

const Html: React.FC<HtmlProps> = ({ appHtml, initialData }) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Bun Hono React SSR</title>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__INITIAL_DATA__ = ${JSON.stringify(initialData)}`,
          }}
        />
      </head>
      <body>
        <div id="root">{appHtml}</div>
        <script src="/main.js" defer type="module"></script>
      </body>
    </html>
  );
};

export default Html;

// rendered server-side in hono route /
// pass data to the app component and Html template
export const renderedHtml = (data?: SSProps) =>
  renderToString(<Html appHtml={<App data={data} />} initialData={data} />);
