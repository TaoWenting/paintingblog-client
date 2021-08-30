import React from 'react';
import { Toolbar } from '@material-ui/core';
import styled from 'styled-components';
import { List, ListItem } from '@material-ui/core';

const Container = styled.div`
  
  overflow-y: overlay;
  
`;
const StyledNavbar = styled(Toolbar)`
  background-color: var(--primary-bg);
  text-align:center;
  color: var(--primary-text);
  font-size: 20px;
  line-height: 40px;
  width: 70%;
  
`;

const PageLeft = styled.div`
  float: left;
  width: 15%;
  height: 40px;
  background-color: white;

`;

const PageRight = styled.div`
  float: right;
  
  width: 15%;
  height: 40px;
  background-color: white;
  

`;

const StyledList = styled(List)`
height: 80px;
padding: 0 15px;
display: flex;
`;

const PaintingNavbar: React.FC = () => 
  
  <Container>
    <StyledList>
      <PageLeft></PageLeft>
      <StyledNavbar>My Painting
      </StyledNavbar>
      <PageRight></PageRight>
    </StyledList>
  </Container>;
  

export default PaintingNavbar;