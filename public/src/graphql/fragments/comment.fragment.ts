import gql from 'graphql-tag';

export default gql`
  fragment Comment on Comment {
    id
 
    content
    painting {
      id
    }   

    

  }
`;