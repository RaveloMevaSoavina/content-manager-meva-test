import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../../../layout/header';
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faInfoCircle,
  faPencil,
  faPlusCircle,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import CategoryCreate from './Create';
import {
  createCategory,
  getAllCategory,
  removeCategory,
  updateCategory,
} from '../../../../services/categories/categories.repository';
import useAsyncEffect from 'use-async-effect';
import RemoveModal from '../../../components/Modal/Remove';
import CreateModal from '../../../components/Modal/CreateArticle';
import ButtonCreate from '../../../components/Action/ButtonCreate';
import ActionGroup from '../../../components/Action/ActionGroup';
import { Category } from 'types/Category';

function CategoryList() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isNewOpen, setIsNewOpen] = useState(false);
  const [itemOpen, setItemOpen] = useState(0);
  const [type, setType] = useState('CREATE');

  useAsyncEffect(async () => {
    const categoriesList = await getAllCategory();
    setCategories(categoriesList.data);
  }, [isNewOpen, isDeleteOpen]);

  const handleRemove = async () => {
    if (!itemOpen) return;
    const removeActionResponse = await removeCategory(
      (itemOpen as any).CategoryID as number
    );

    if (removeActionResponse.status === 'OK') {
      setIsDeleteOpen(false);
    }
  };

  const handleCreate = async (data: Category) => {
    const removeActionResponse = await createCategory(data);
    console.log(removeActionResponse);
    if (removeActionResponse.status === 'OK') {
      setIsNewOpen(false);
    }
  };

  const handleUpdate = async (data: Category) => {
    const removeActionResponse = await updateCategory(data);
    if (removeActionResponse.status === 'OK') {
      setIsNewOpen(false);
    }
  };

  return (
    <Container>
      <Header parent='Categories' title='List of all categories' />

      <ButtonCreate
        module='category'
        setOpenModal={setIsNewOpen}
        setTypeAction={setType}
      />

      <Container style={{ width: '100%' }}>
        <CTable striped>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope='col'>CategoryID</CTableHeaderCell>
              <CTableHeaderCell scope='col'>Title</CTableHeaderCell>
              <CTableHeaderCell scope='col'>Action</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {(categories || []).map((category: Category) => {
              return (
                <CTableRow>
                  <CTableHeaderCell scope='row'>
                    {category.CategoryID}
                  </CTableHeaderCell>
                  <CTableDataCell>{category.Title}</CTableDataCell>
                  <CTableDataCell>
                    <ActionGroup
                      element={category}
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
        visibility={isNewOpen}
        setVisibility={setIsNewOpen}
        module={'category'}
        onSubmit={handleCreate}
        itemOpen={itemOpen}
        onEdit={handleUpdate}
      />
    </Container>
  );
}

export default CategoryList;

const Container = styled.div`
  margin: 20px;
`;

const Action = styled(FontAwesomeIcon)`
  margin: 0 10px;
  cursor: pointer;
`;
