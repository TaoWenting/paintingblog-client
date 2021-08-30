import { DataProxy } from 'apollo-cache';
import { defaultDataIdFromObject } from 'apollo-cache-inmemory';
import * as fragments from '../graphql/fragments';
import * as queries from '../graphql/queries';
import {
  CommentFragment,
  useCommentAddedSubscription,
  PaintingsQuery,
} from '../graphql/types';

type Client = Pick<
  DataProxy,
  'readFragment' | 'writeFragment' | 'readQuery' | 'writeQuery'
>;

export const useCacheService = () => {
  useCommentAddedSubscription({
    onSubscriptionData: ({ client, subscriptionData: { data } }) => {
      if (data) {
        writeComment(client, data.commentAdded);
      }
    },
  });
};

export const writeComment = (client: Client, comment: CommentFragment) => {
  type FullPainting = { [key: string]: any };
  let fullPainting;

  const paintingIdFromStore = defaultDataIdFromObject(comment.painting);
  //(comment.painting)

  if (paintingIdFromStore === null) {
    return;
  }
  try {
    fullPainting = client.readFragment<FullPainting>({
      id: paintingIdFromStore,
      fragment: fragments.fullPainting,
      fragmentName: 'FullPainting',
    });
  } catch (e) {
    return;
  }

  if (fullPainting === null || fullPainting.comments === null) {
    return;
  }
  if (fullPainting.comments.comments.some((m: any) => m.id === comment.id)) return;

  fullPainting.comments.push(comment);
  fullPainting.lastComment = comment;

  client.writeFragment({
    id: paintingIdFromStore,
    fragment: fragments.fullPainting,
    fragmentName: 'FullPainting',
    data: fullPainting,
  });

  let data;
  try {
    data = client.readQuery<PaintingsQuery>({
      query: queries.paintings,
    });
  } catch (e) {
    return;
  }

  if (!data || data === null) {
    return null;
  }
  if (!data.paintings || data.paintings === undefined) {
    return null;
  }
  const paintings = data.paintings;

  const paintingIndex = paintings.findIndex((c: any) => {
    //if (comment === null ) return -1;
    if (comment === null || comment.painting === null) return -1;
    //return c.id === comment?.id;
    return c.id === comment?.painting?.id;
  });
  if (paintingIndex === -1) return;
  const paintingWhereAdded = paintings[paintingIndex];

  // The painting will appear at the top of the PaintingsList component
  paintings.splice(paintingIndex, 1);
  paintings.unshift(paintingWhereAdded);

  client.writeQuery({
    query: queries.paintings,
    data: { paintings: paintings },
  });
};