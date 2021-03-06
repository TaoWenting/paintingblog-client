import gql from 'graphql-tag';
import * as fragments from '../fragments';

export default gql`
  query Paintings {
    paintings {
      ...Painting
    }
  }
  ${fragments.painting}
`;