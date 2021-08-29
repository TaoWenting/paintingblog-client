import React from 'react';
import { useCallback } from 'react';
import { History } from 'history';
import { List, ListItem } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import styled from 'styled-components';
import { usePaintingsQuery } from '../../graphql/types';



const Container = styled.div`
  height: calc(100% - 56px);
  overflow-y: overlay;
  
`;
const PageLeft = styled.div`
  float: left;
  width: 20%;
  height: 150px;
  background-color: white;

`;

const PageRight = styled.div`
  float: right;
  width: 20%;
  height: 150px;
  background-color: white;

`;


const StyledList = styled(List)`
  padding: 0 !important;
`;

const StyledListItem = styled(ListItem)`
  height: 150px;
  padding: 0 15px;
  display: flex;
`;

const PaintingPicture = styled.img`
  height: 150px;
  width: 100px;
  object-fit: contain;
  
  
`;

const PaintingInfo = styled.div`
  width: calc(100% - 60px);
  height: 46px;
  padding: 15px 0;
  margin-left: 10px;
  border-bottom: 0.5px solid silver;
  position: relative;
`;

const PaintingName = styled.div`
  margin-top: 5px;
`;

const PaintingContent = styled.div`
  color: gray;
  font-size: 15px;
  margin-top: 5px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;



interface PiantingListProps {
  history: History;
}

const PaintingList: React.FC<PiantingListProps> = ({ history }) => {

  const navToPainting = useCallback(
    (painting) => {
      history.push(`paintings/${painting.id}`);
    },
    [history]
  );

  const { data } = usePaintingsQuery();

  if (data === undefined || data.paintings === undefined) {
    return null;
  }
  let paintings = data.paintings;

  return(
    <Container>

        <StyledList>

          {paintings.map((painting: any) => (
              <StyledListItem
              key={painting.id}
              
              button
              onClick={navToPainting.bind(null, painting)}>
              <PageLeft></PageLeft>
              <PaintingPicture src={painting.picture} alt="" />
              <PaintingInfo>
              <FavoriteIcon color="primary"/> 
              <PaintingName>{painting.name}</PaintingName>
              {painting.lastComment && (
                <React.Fragment>
                  <PaintingContent>{painting.lastComment.content}</PaintingContent>
                </React.Fragment>
              )}
             </PaintingInfo>
             <PageRight></PageRight>
           </StyledListItem>
        ))}
        </StyledList>
              
    </Container>
  );
};  

export default PaintingList;