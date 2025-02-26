import styled from "styled-components";

export const PostsContainer = styled.div`
  padding: 20px;
  overflow-y: auto;
`;

export const PostContainer = styled.div`
  background: #fff;
  padding: 15px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

export const PostAuthor = styled.div`
  font-weight: bold;
`;

export const PostContent = styled.div`
  margin-top: 10px;
`;

export const CommentsContainer = styled.div`
  margin-top: 10px;
  border-top: 1px solid #eee;
  padding-top: 10px;
`;

export const CommentRow = styled.div`
  margin-bottom: 5px;
`;

export const CommentAuthor = styled.span`
  font-weight: bold;
`;

export const NewTextForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

export const NewTextInput = styled.textarea`
  resize: vertical;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 10px;
`;

export const SubmitButton = styled.button`
  align-self: flex-end;
  padding: 10px 20px;
  background-color: #007a5a;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;
