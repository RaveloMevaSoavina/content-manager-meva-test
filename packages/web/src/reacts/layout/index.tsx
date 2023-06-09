import styled from 'styled-components';
import Sidebar from './sidebar';

interface ILayout {
  children: JSX.Element;
}

function Layout({ children }: ILayout) {
  return (
    <Container>
      <SideBarWrapper>
        <Sidebar />
      </SideBarWrapper>
      <Content>{children}</Content>
    </Container>
  );
}

export default Layout;

const Container = styled.div`
  width: 100vw;
  height: 100vh
  display: flex;
  flex-direction: row;
  margin: 0;
`;

const SideBarWrapper = styled.div`
  width: 300px;
  height: 100vh;
  background-color: #eee;
  margin-right: 20px;
  position: fixed;
`;

const Content = styled.div`
  padding: 20px;
  margin-left: 300px;
  min-height: 100vh;
`;
