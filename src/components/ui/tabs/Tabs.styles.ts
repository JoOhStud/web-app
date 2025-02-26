import styled from "styled-components";

export const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.palette.divider};
`;

export const TabButton = styled.button<{ active: boolean }>`
  padding: 10px 20px;
  background-color: ${({ theme, active }) =>
    active ? theme.palette.primary.main : theme.palette.background.default};
  color: ${({ theme }) => theme.palette.text.primary};
  border: none;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.palette.action.hover};
  }
`;
