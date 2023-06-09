import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react';
import ArticleCreate from '../../views/management/articles/Create';
import { useEffect, useState } from 'react';
import { Article } from 'types/Article';
import CategoryCreate from '../../views/management/categories/Create';
import TagCreate from '../../views/management/tags/Create';

function CreateArticle({
  visibility,
  setVisibility,
  onSubmit,
  typeAction,
  itemOpen,
  onEdit,
  module,
}: any) {
  const [data, setData] = useState<Article>();

  useEffect(() => {
    if (typeAction !== 'CREATE') {
      setData({ ...itemOpen });
    } else {
      setData({} as Article);
    }
  }, [typeAction, itemOpen]);

  const handleCreate = () => {
    if (typeAction === 'CREATE') onSubmit(data);
    else onEdit(data);
  };

  return (
    <CModal
      alignment='center'
      visible={visibility}
      onClose={() => setVisibility(false)}>
      <CModalHeader>
        <CModalTitle>{typeAction}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        {module === 'article' && (
          <ArticleCreate
            setData={setData}
            data={data}
            typeAction={typeAction}
          />
        )}

        {module === 'category' && (
          <CategoryCreate
            setData={setData}
            data={data}
            typeAction={typeAction}
          />
        )}

        {module === 'tag' && (
          <TagCreate setData={setData} data={data} typeAction={typeAction} />
        )}
      </CModalBody>
      <CModalFooter>
        <CButton color='secondary' onClick={() => setVisibility(false)}>
          Close
        </CButton>
        {typeAction !== 'INFO' && (
          <CButton color='success' onClick={handleCreate}>
            {typeAction === 'CREATE' ? 'Create' : 'Update'}
          </CButton>
        )}
      </CModalFooter>
    </CModal>
  );
}

export default CreateArticle;
