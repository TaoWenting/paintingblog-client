import gql from 'graphql-tag';
import comment from './comment.fragment';

export default gql`
  fragment Painting on Painting {
    id
    name
    picture
    lastComment {
      ...Comment
    }
  }
  ${comment}
`;