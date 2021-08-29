import React from 'react';
import PaintingNavbar from './PaintingNavbar';
import PaintingList from './PaintingList';
import styled from 'styled-components';
import VideoPlayer from '../VideoScreen';
import { History } from 'history';

const Container = styled.div`
  height: 100vh;
  `;


interface PaintingListScreenProps {
  history: History;
}

const PaintingListScreen: React.FC<PaintingListScreenProps> = ({ history }) => (
  <Container>
    <VideoPlayer />
    <PaintingNavbar />
    <PaintingList history={history}/>
  </Container>
);

export default PaintingListScreen;