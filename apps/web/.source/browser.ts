// @ts-nocheck
import { browser } from 'fumadocs-mdx/runtime/browser';
import type * as Config from '../source.config';

const create = browser<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>();
const browserCollections = {
  docs: create.doc("docs", {"leanllm/cli.mdx": () => import("../content/documentation-v2/leanllm/cli.mdx?collection=docs"), "leanllm/configuration.mdx": () => import("../content/documentation-v2/leanllm/configuration.mdx?collection=docs"), "leanllm/context.mdx": () => import("../content/documentation-v2/leanllm/context.mdx?collection=docs"), "leanllm/cost.mdx": () => import("../content/documentation-v2/leanllm/cost.mdx?collection=docs"), "leanllm/dx-helpers.mdx": () => import("../content/documentation-v2/leanllm/dx-helpers.mdx?collection=docs"), "leanllm/installation.mdx": () => import("../content/documentation-v2/leanllm/installation.mdx?collection=docs"), "leanllm/interception.mdx": () => import("../content/documentation-v2/leanllm/interception.mdx?collection=docs"), "leanllm/leanllm.mdx": () => import("../content/documentation-v2/leanllm/leanllm.mdx?collection=docs"), "leanllm/lineage.mdx": () => import("../content/documentation-v2/leanllm/lineage.mdx?collection=docs"), "leanllm/normalization.mdx": () => import("../content/documentation-v2/leanllm/normalization.mdx?collection=docs"), "leanllm/quick-start.mdx": () => import("../content/documentation-v2/leanllm/quick-start.mdx?collection=docs"), "leanllm/redaction.mdx": () => import("../content/documentation-v2/leanllm/redaction.mdx?collection=docs"), "leanllm/replay.mdx": () => import("../content/documentation-v2/leanllm/replay.mdx?collection=docs"), "leanllm/runtime-toggles.mdx": () => import("../content/documentation-v2/leanllm/runtime-toggles.mdx?collection=docs"), "leanllm/storage-query.mdx": () => import("../content/documentation-v2/leanllm/storage-query.mdx?collection=docs"), }),
};
export default browserCollections;