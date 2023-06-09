import { Route, Routes } from 'react-router-dom';

import ArticleList from './reacts/views/management/articles/List';
import CategoryList from './reacts/views/management/categories/List';
import TagList from './reacts/views/management/tags/List';

function App() {
  return (
    <Routes>
      <Route path='/articles' element={<ArticleList />} />
      <Route path='/categories' element={<CategoryList />} />
      <Route path='/tags' element={<TagList />} />
    </Routes>
  );
}

export default App;
