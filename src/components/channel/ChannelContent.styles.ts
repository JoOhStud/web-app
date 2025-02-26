import styled from "styled-components";

export const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #ddd;
`;

export const TabButton = styled.button<{ active: boolean }>`
  padding: 10px 20px;
  background-color: ${({ active }) => (active ? "#fff" : "#eee")};
  border: none;
  border-bottom: ${({ active }) => (active ? "2px solid #007a5a" : "none")};
  cursor: pointer;
  outline: none;

  &:hover {
    background-color: #fff;
  }
`;
