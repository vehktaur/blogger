import { createEdgeStoreNextHandler } from '@edgestore/server/adapters/next/app';
import { edgeStoreRouter } from '@/lib/edgestoreRouter';
//create the api handler
const handler = createEdgeStoreNextHandler({
  router: edgeStoreRouter,
});

//export the api handler for GET and POST requests
export { handler as GET, handler as POST };
