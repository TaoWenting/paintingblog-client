
import gql from 'graphql-tag';
import React from 'react';
import { useCallback } from 'react';

import styled from 'styled-components';
import PaintingNavbar from './PaintingNavbar';
import CommentInput from './CommentInput';
import CommentsList from './CommentsList';
import { History } from 'history';

import * as fragments from '../../graphql/fragments';
import { useGetPaintingQuery, useAddCommentMutation } from '../../graphql/types';
import {  writeComment } from '../../services/cache.service';



const Container = styled.div`
  background: url(/assets/painting-background.jpg);
  display: flex;
  flex-flow: column;
  height: 100vh;
`;

const Picture = styled.img`
max-width:64rem;
width: 40%;
max-height:30.875rem;
height: 480px;
margin:1.25rem auto;
padding:1.051%;
background-color:var(--primary-bg);
`;

// eslint-disable-next-line
const getPaintingQuery = gql `
  query GetPainting($paintingId: ID!) {
    painting(paintingId: $paintingId) {
      ...FullPainting
    }
  }
  ${fragments.fullPainting}
`;

// eslint-disable-next-line
const addCommentMutation = gql`
  mutation AddComment($paintingId: ID!, $content: String!) {
    addComment(paintingId: $paintingId, content: $content) {
      ...Comment
    }
  }
  ${fragments.comment}
`;

interface PaintingDetailScreenParams {
  paintingId: string;
  history: History;
}




const PaintingDetailScreen: React.FC<PaintingDetailScreenParams> = ({
  history,
  paintingId,
}) => {
 
  const { data, loading } = useGetPaintingQuery({
    variables: { paintingId },
  });
  
  const [addComment] = useAddCommentMutation();

  const onSendComment = useCallback(
    (content: string) => {
      if (data === undefined) {
        return null;
      }
      const painting = data.painting;
      if (painting === null) return null;

      addComment({
        variables: { paintingId, content },
        optimisticResponse: {
          __typename: 'Mutation',
          addComment: {
            __typename: 'Comment',
            id: Math.random().toString(36).substr(2, 9),
            painting: {
              __typename: 'Painting',
              id: paintingId,
            },           
            content,
          },
        },
        update: (client, { data }) => {
          if (data && data.addComment) {
            writeComment(client, data.addComment);
          

          }

        },
      });
    },
    [data, paintingId, addComment]
  );

  if (data === undefined) {
    return null;
  }
  const painting = data.painting;
  const loadingPainting = loading;

  if (loadingPainting) return null;
  if (painting === null) return null;

  return (
    <Container>
      <PaintingNavbar painting={painting} history={history} />
      <Picture src={painting?.picture} />

      {painting?.comments && <CommentsList comments={painting.comments} />}

      <CommentInput onSendomment={onSendComment} />
    </Container>
  );
};
export default PaintingDetailScreen;