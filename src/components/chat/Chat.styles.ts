import styled from "styled-components";

export const DirectChatContainer = styled.div`
  display: flex;
  height: 100%;
`;

export const ContactsSidebar = styled.div`
  width: 250px;
  background-color: #3f0e40;
  color: white;
  padding: 20px;
  overflow-y: auto;
`;

export const ContactItem = styled.div`
  padding: 10px;
  cursor: pointer;

  &:hover {
    background-color: #532753;
  }
`;

export const ChatWindow = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const MessagesContainer = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #f8f8f8;
  overflow-y: auto;
`;

export const MessageRow = styled.div`
  margin-bottom: 10px;
`;

export const MessageInputForm = styled.form`
  display: flex;
  padding: 10px;
  border-top: 1px solid #ddd;
  background-color: white;
`;

export const MessageInputField = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

export const MessageInputButton = styled.button`
  margin-left: 10px;
  padding: 10px 20px;
  background-color: #007a5a;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;
