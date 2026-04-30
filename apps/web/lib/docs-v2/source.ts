import { loader } from 'fumadocs-core/source';

import { docs } from 'collections/server';

export const docsV2Source = loader({
  baseUrl: '/docs-v2',
  source: docs.toFumadocsSource(),
});
