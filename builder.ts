const build = async () => {
  await Bun.build({
    outdir: "./dist",
    entrypoints: ["./src/entry-client.tsx"],
    target: "browser",
    splitting: true,
    minify: {
      identifiers: true,
      syntax: true,
      whitespace: true,
    },
  });
};

build();
