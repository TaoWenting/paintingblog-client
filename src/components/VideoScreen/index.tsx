import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import styled from 'styled-components';

const Container = styled.div`
    max-width:64rem;
    width: 50%;
    max-height:30.875rem;
    height: 240px;
    margin:1.25rem auto;
    padding:1.051%;
    background-color:var(--primary-bg);
`;
const VideoPlayer= () => (
    <Container>
    <ReactPlayer
      
      url='https://www.youtube.com/watch?v=38_LYZknQ10'
      width='100%'
      height='100%'
    />
  </Container>
  );

  export default VideoPlayer;