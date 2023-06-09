import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faNewspaper,
  faTags,
  faListAlt,
} from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

function Sidebar() {
  return (
    <Wrapper>
      <Brand>ArtiScribe</Brand>
      <Menus>
        <CustomLink to='/articles'>
          <FontAwesomeIcon icon={faNewspaper} size='lg' />
          <Item>Articles</Item>
        </CustomLink>
        <CustomLink to='/categories'>
          <FontAwesomeIcon icon={faListAlt} size='lg' />
          <Item>Categories</Item>
        </CustomLink>
        <CustomLink to='/tags'>
          <FontAwesomeIcon icon={faTags} size='lg' />
          <Item>Tags</Item>
        </CustomLink>
      </Menus>
    </Wrapper>
  );
}

export default Sidebar;

const Wrapper = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
`;

const Brand = styled.h2`
  text-align: center;
  font-size: 2.1rem;
  cursor: pointer;
  padding: 20px;
`;

const Menus = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-top: 60px;
`;

const CustomLink = styled(Link)`
  display: flex;
  cursor: pointer;
  padding: 20px;
  text-decoration: none;
  color: #666;

  &:hover {
    background-color: #ddd;
  }
`;

const Item = styled.span`
  margin-left: 20px;
  font-size: 1.1rem;
`;
