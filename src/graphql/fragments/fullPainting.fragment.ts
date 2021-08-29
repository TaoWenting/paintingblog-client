import gql from 'graphql-tag';
import painting from './painting.fragment';
import comment from './comment.fragment';

export default gql`
  fragment FullPainting on Painting {
    ...Painting
    comments {
      ...Comment
    }
  }
  ${painting}
  ${comment}
`;