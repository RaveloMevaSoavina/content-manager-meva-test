import { useState } from 'react';
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react';
import styled from 'styled-components';
import useAsyncEffect from 'use-async-effect';

import Header from '~/react/layout/header';
import ActionGroup from '~/react/components/Action/ActionGroup';
import RemoveModal from '~/react/components/Modal/Remove';
import CreateModal from '~/react/components/Modal/CreateArticle';
import ButtonCreate from '~/react/components/Action/ButtonCreate';
import Filter from '~/react/components/Filter';

import {
  createOne,
  getAllArticles,
  getArticleByCategory,
  getArticleByTag,
  removeOne,
  updateOne,
} from '~/services/articles/articles.repository';
import formatDate from '~/services/utils/formatDate';

import { ApiResponse } from 'types/ApiResponse';
import { Article } from 'types/Article';
import { Category } from 'types/Category';
import {
  getAllCategory,
  getCategoryOfArticle,
} from '~/services/categories/categories.repository';

function ArticleList() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  const [isNewOpen, setIsNewOpen] = useState<boolean>(false);
  const [itemOpen, setItemOpen] = useState<Article>({} as Article);
  const [type, setType] = useState('CREATE');
  const [refresh, setRefresh] = useState<boolean>(false);

  useAsyncEffect(async () => {
    const articlesList: ApiResponse<Article[]> = await getAllArticles();
    const categoriesList: ApiResponse<Category[]> = await getAllCategory();
    setArticles(articlesList.data);
    setCategories(categoriesList.data);
  }, [isDeleteOpen, isNewOpen, refresh]);

  const handleRemove = async () => {
    if (!itemOpen) return;
    const removeActionResponse = await removeOne(
      (itemOpen as Article).ArticleID as number
    );
    if (removeActionResponse.status === 'OK') {
      setIsDeleteOpen(false);
    }
  };

  const handleCreate = async (data: Article) => {
    const removeActionResponse = await createOne(data);
    if (removeActionResponse.status === 'OK') {
      setIsNewOpen(false);
    }
  };

  const handleUpdate = async (data: Article) => {
    const removeActionResponse = await updateOne(data);
    if (removeActionResponse.status === 'OK') {
      setIsNewOpen(false);
    }
  };

  const handleCategoryFilterChange = async (categoryId: number) => {
    if (!categoryId) {
      const articlesList: ApiResponse<Article[]> = await getAllArticles();
      setArticles(articlesList.data);
    }
    const articlesList: ApiResponse<Article[]> = await getArticleByCategory(
      categoryId
    );
    setArticles(articlesList.data);
  };

  const handleTagFilterChange = async (tagId: number) => {
    if (!tagId) {
      const articlesList: ApiResponse<Article[]> = await getAllArticles();
      setArticles(articlesList.data);
    }
    const articlesList: ApiResponse<Article[]> = await getArticleByTag(tagId);
    setArticles(articlesList.data);
  };

  return (
    <Container>
      <Header parent='Articles' title='List of all articles' />

      <ButtonCreate
        module='article'
        setOpenModal={setIsNewOpen}
        setTypeAction={setType}
      />

      <Filter
        onCategoryFilterChange={handleCategoryFilterChange}
        onTagFilterChange={handleTagFilterChange}
        reCall={setRefresh}
      />

      <Container>
        <CTable striped>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope='col'>ArticleID</CTableHeaderCell>
              <CTableHeaderCell scope='col'>Title</CTableHeaderCell>
              <CTableHeaderCell scope='col'>Reporter</CTableHeaderCell>
              <CTableHeaderCell scope='col'>Body</CTableHeaderCell>
              <CTableHeaderCell scope='col'>PublishDate</CTableHeaderCell>
              <CTableHeaderCell scope='col'>CategoryID</CTableHeaderCell>
              <CTableHeaderCell scope='col'>Action</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {(articles || []).map((article: Article) => {
              return (
                <CTableRow key={article.ArticleID}>
                  <CTableHeaderCell scope='row'>
                    {article.ArticleID}
                  </CTableHeaderCell>
                  <CTableDataCell>{article.Title}</CTableDataCell>
                  <CTableDataCell>{article.Reporter}</CTableDataCell>
                  <CTableDataCell>{article.Body}</CTableDataCell>
                  <CTableDataCell>
                    {formatDate(article.PublishDate as string)}
                  </CTableDataCell>
                  <CTableDataCell>
                    {getCategoryOfArticle(categories, article.CategoryID)}
                  </CTableDataCell>
                  <CTableDataCell>
                    <ActionGroup
                      element={article}
                      setIsDeleteOpen={setIsDeleteOpen}
                      setType={setType}
                      setItemOpen={setItemOpen}
                      setIsNewOpen={setIsNewOpen}
                    />
                  </CTableDataCell>
                </CTableRow>
              );
            })}
          </CTableBody>
        </CTable>
      </Container>

      <RemoveModal
        visibility={isDeleteOpen}
        setVisibility={setIsDeleteOpen}
        onRemove={handleRemove}
      />
      <CreateModal
        typeAction={type}
        module={'article'}
        visibility={isNewOpen}
        setVisibility={setIsNewOpen}
        onSubmit={handleCreate}
        onEdit={handleUpdate}
        itemOpen={itemOpen}
      />
    </Container>
  );
}

export default ArticleList;

const Container = styled.div`
  margin: 20px;
`;
