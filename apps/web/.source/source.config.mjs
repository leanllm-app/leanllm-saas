// source.config.ts
import { defineConfig, defineDocs } from "fumadocs-mdx/config";
var docs = defineDocs({
  dir: "content/documentation-v2"
});
var source_config_default = defineConfig();
export {
  source_config_default as default,
  docs
};
