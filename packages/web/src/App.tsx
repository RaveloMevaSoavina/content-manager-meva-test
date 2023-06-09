import { Route, Routes } from 'react-router-dom';

import ArticleList from './react/views/management/articles/List';
import CategoryList from './react/views/management/categories/List';
import TagList from './react/views/management/tags/List';
import Home from './react/views/Home';

function App() {
  return (
    <Routes>
      <Route path='/articles' element={<ArticleList />} />
      <Route path='/categories' element={<CategoryList />} />
      <Route path='/tags' element={<TagList />} />
      <Route path='/' element={<Home />} />
    </Routes>
  );
}

export default App;
