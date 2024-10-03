import { maxSize } from '@/lib/definitions';
import { initEdgeStore } from '@edgestore/server';
import { createEdgeStoreNextHandler } from '@edgestore/server/adapters/next/app';

//Initiate the edgeStore builder
const es = initEdgeStore.create();

//create the edgeStore router and configure the edgeStore image bucket
export const edgeStoreRouter = es.router({
  blogPostImages: es
    .imageBucket({
      maxSize: maxSize,
    })
    .beforeDelete(({ ctx, fileInfo }) => {
      console.log(`Deleted: ${fileInfo} \n With ctx: ${ctx}`);
      return true;
    }),
});

//create the api handler
const handler = createEdgeStoreNextHandler({
  router: edgeStoreRouter,
});

//export the api handler for GET and POST requests
export { handler as GET, handler as POST };

//export the type of the router for type safety
export type EdgeStoreRouter = typeof edgeStoreRouter;
