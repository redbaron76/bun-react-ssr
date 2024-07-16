import type { BuildOutput } from "bun";
import { Hono } from "hono";
import { getServerSideProps } from "@/App";
import { renderedHtml } from "@/html";
import { serveStatic } from "hono/bun";

const initHono = (builds: BuildOutput) => {
  const hono = new Hono();

  // get the locale from the url Optional) and render the app
  hono.get("/:locale{(it|en)}?", async (c) => {
    // get the locale from the url (optional)
    const { locale } = c.req.param();

    // get data server-side
    const data = await getServerSideProps(locale);

    // render the app to a string and pass data by the props
    const html = renderedHtml(data.props);

    // return the rendered html
    return c.html(html);
  });

  // serve the main.js file (requested in HTML template)
  hono.get("/main.js", async (c) => {
    return c.body(builds.outputs[0].stream(), 200, {
      "Content-Type": builds.outputs[0].type,
    });
  });

  // serve static assets in /public folder (unbundled)
  hono.get("*", serveStatic({ root: "./public" }));

  return hono;
};

export default initHono;
