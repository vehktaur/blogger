import { maxSize } from '@/lib/definitions';
import { initEdgeStore } from '@edgestore/server';

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

//export the type of the router for type safety
export type EdgeStoreRouter = typeof edgeStoreRouter;
