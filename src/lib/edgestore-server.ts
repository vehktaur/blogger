import { edgeStoreRouter } from './edgestoreRouter';
import { initEdgeStoreClient } from '@edgestore/server/core';

export const backendClient = initEdgeStoreClient({
  router: edgeStoreRouter,
});
