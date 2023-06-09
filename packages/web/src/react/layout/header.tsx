import styled from 'styled-components';

function Header({ title, parent }: any) {
  return (
    <Wrapper>
      {parent} {'>'} <Highlight>{title}</Highlight>
    </Wrapper>
  );
}

export default Header;

const Wrapper = styled.div`
  font-weight: bold;
`;

const Highlight = styled.span`
  color: #646cff;
`;
