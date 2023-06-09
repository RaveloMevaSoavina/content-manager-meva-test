import React, { useState } from 'react';
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
import {
  faInfoCircle,
  faPencil,
  faPlusCircle,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styled from 'styled-components';
import Header from '../../../layout/header';
import TagCreate from './Create';
import useAsyncEffect from 'use-async-effect';
import {
  createTag,
  getAllTags,
  removeTag,
  updateTag,
} from '../../../../services/tags/tags.repository';
import { Tag } from 'types/Tag';
import ButtonCreate from '../../../components/Action/ButtonCreate';
import RemoveModal from '../../../components/Modal/Remove';
import CreateModal from '../../../components/Modal/CreateArticle';
import ActionGroup from '../../../components/Action/ActionGroup';

function TagList() {
  const [tags, setTags] = useState([]);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isNewOpen, setIsNewOpen] = useState(false);
  const [itemOpen, setItemOpen] = useState<Tag>();
  const [type, setType] = useState('CREATE');

  useAsyncEffect(async () => {
    const categoriesList = await getAllTags();
    setTags(categoriesList.data);
  }, [isNewOpen, isDeleteOpen]);

  const handleRemove = async () => {
    if (!itemOpen) return;

    const removeActionResponse = await removeTag(itemOpen.TagID as number);

    if (removeActionResponse.status === 'OK') {
      setIsDeleteOpen(false);
    }
  };

  const handleCreate = async (data: Tag) => {
    const removeActionResponse = await createTag(data);

    if (removeActionResponse.status === 'OK') {
      setIsNewOpen(false);
    }
  };

  const handleUpdate = async (data: Tag) => {
    const removeActionResponse = await updateTag(data);

    if (removeActionResponse.status === 'OK') {
      setIsNewOpen(false);
    }
  };

  return (
    <Container>
      <Header parent='Tags' title='List of all tags' />

      <ButtonCreate
        module='tag'
        setOpenModal={setIsNewOpen}
        setTypeAction={setType}
      />

      <Container style={{ width: '100%' }}>
        <CTable striped>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope='col'>TagID</CTableHeaderCell>
              <CTableHeaderCell scope='col'>Title</CTableHeaderCell>
              <CTableHeaderCell scope='col'>Action</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {(tags || []).map((tag: Tag) => {
              return (
                <CTableRow key={tag.TagID}>
                  <CTableHeaderCell scope='row'>{tag.TagID}</CTableHeaderCell>
                  <CTableDataCell>{tag.Title}</CTableDataCell>
                  <CTableDataCell>
                    <ActionGroup
                      element={tag}
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

export default TagList;

const Container = styled.div`
  margin: 20px;
`;

const Action = styled(FontAwesomeIcon)`
  margin: 0 10px;
  cursor: pointer;
`;
