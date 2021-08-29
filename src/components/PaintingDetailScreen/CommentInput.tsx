import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';

const Container = styled.div`
  display: flex;
  height: 50px;
  padding: 5px;
  width: calc(100% - 10px);
`;

const ActualInput = styled.input`
  width: calc(100% - 50px);
  border: none;
  border-radius: 999px;
  padding: 10px;
  padding-left: 20px;
  padding-right: 20px;
  font-size: 15px;
  outline: none;
  box-shadow: 0 1px silver;
  font-size: 18px;
  line-height: 45px;
`;

const SendButton = styled(Button)`
  min-width: 50px !important;
  width: 50px !important;
  border-radius: 999px !important;
  background-color: var(--primary-bg) !important;
  margin: 0 5px !important;
  margin-right: 0 !important;
  color: white !important;
  padding-left: 20px !important;
  svg {
    margin-left: -3px;
  }
`;


  interface CommentInputProps {
    onSendomment(content: string): any;
  }
  
  const CommentInput: React.FC<CommentInputProps> = ({ onSendomment }) => {
    const [comment, setComment] = useState('');
  
    const onKeyPress = (e: any) => {
      if (e.charCode === 13) {
        submitComment();
      }
    };
  
    const onChange = ({ target }: any) => {
      setComment(target.value);
    };
  
    const submitComment = () => {
      if (!comment) return;
  
      setComment('');
  
      if (typeof onSendomment === 'function') {
        onSendomment(comment);
      }
    };
  return (
    <Container>
      <ActualInput
        type="text"
        placeholder="Type a comment"
        value={comment}
        onKeyPress={onKeyPress}
        onChange={onChange}
      />
      <SendButton variant="contained" color="primary" onClick={submitComment}>
        <SendIcon />
      </SendButton>
    </Container>
  );
};

export default CommentInput;