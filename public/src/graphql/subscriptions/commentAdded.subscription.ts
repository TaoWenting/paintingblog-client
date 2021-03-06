import gql from 'graphql-tag';
import * as fragments from '../fragments';

export default gql`
  subscription CommentAdded {
    commentAdded {
      ...Comment
    }
  }
  ${fragments.comment}
`;