import { flexsearchFromSource } from 'fumadocs-core/search/flexsearch';

import { docsV2Source } from '~/lib/docs-v2/source';

const searchApi = flexsearchFromSource(docsV2Source);

export const GET = searchApi.GET;
