import styled from "styled-components";

export const AppContainer = styled.div`
  display: flex;
  height: 100vh;
`;

export const SidebarContainer = styled.div`
  width: 250px;
  background-color: ${({ theme }) => theme.palette.secondary.main};
  color: ${({ theme }) => theme.palette.text.primary};
  padding: 20px;
  overflow-y: auto;
  height: 100vh;
  position: fixed;
  top: 64px;
  left: 0;
  z-index: 1000;
`;

export const ChatContainer = styled.div`
  flex: 1;
  margin-left: 250px;
  padding-top: 64px; /* Height of the AppBar */
  overflow-y: auto;
`;

export const AppBarContainer = styled.div`
  flex-grow: 1;
  .MuiAppBar-root {
    z-index: 1100;
  }
`;
