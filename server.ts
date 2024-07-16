import initHono from "@/hono";

const builds = await Bun.build({
  entrypoints: ["./src/entry-client.tsx"],
  target: "browser",
  splitting: true,
  minify: {
    identifiers: false,
    syntax: false,
    whitespace: false,
  },
});

const server = Bun.serve({
  port: 8080,
  hostname: "0.0.0.0",
  fetch: initHono(builds).fetch,
});

console.log(`Listening on ${server.hostname}:${server.port}`);
