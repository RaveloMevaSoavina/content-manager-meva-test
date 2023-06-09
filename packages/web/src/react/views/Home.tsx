import styled from 'styled-components';
import Header from '../layout/header';
import Stats from '../components/Card/Stats';
import { useState } from 'react';
import useAsyncEffect from 'use-async-effect';
import { getAllArticles } from '~/services/articles/articles.repository';
import { getAllTags } from '~/services/tags/tags.repository';
import { getAllCategory } from '~/services/categories/categories.repository';

import {
  faNewspaper,
  faTags,
  faListAlt,
} from '@fortawesome/free-solid-svg-icons';

function Home() {
  const [counts, setCounts] = useState({
    article: 0,
    category: 0,
    tag: 0,
  });

  useAsyncEffect(async () => {
    const articles = await getAllArticles();
    const categories = await getAllCategory();
    const tags = await getAllTags();
    setCounts({
      article: articles.data.length,
      category: categories.data.length,
      tag: tags.data.length,
    });
  }, []);

  return (
    <Wrapper>
      <Header parent='Dashboard' title='Home' />

      <Title>Welcome on ArtiScribe,</Title>
      <Statistics>
        <Stats
          count={counts.article}
          module={'Articles'}
          color='warning'
          icon={faNewspaper}
        />
        <Stats
          count={counts.category}
          module={'Categories'}
          color='danger'
          icon={faListAlt}
        />
        <Stats
          count={counts.tag}
          module={'Tags'}
          color='success'
          icon={faTags}
        />
      </Statistics>
    </Wrapper>
  );
}

export default Home;

const Wrapper = styled.div``;
const Statistics = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Title = styled.h1`
  margin: 20px;
`;
