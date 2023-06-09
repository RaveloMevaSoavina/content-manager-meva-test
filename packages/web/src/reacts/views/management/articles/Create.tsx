import React, { Fragment, useEffect, useState } from 'react';
import { CForm, CFormInput, CFormSelect, CFormTextarea } from '@coreui/react';
import useAsyncEffect from 'use-async-effect';
import { getAllCategory } from '../../../../services/categories/categories.repository';

function ArticleCreate({ typeAction, setData, data }: any) {
  const [optionsCategory, setOptionsCategory] = useState<any>([]);

  useAsyncEffect(async () => {
    const categoriesList = await getAllCategory();
    setOptionsCategory([
      ...categoriesList.data.map((category: any) => {
        return { value: category.CategoryID, label: category.Title };
      }),
    ]);
  }, []);

  return (
    <Fragment>
      <CForm>
        <CFormInput
          type='text'
          id='title'
          label='Article Title'
          placeholder='Enter your title'
          value={data.Title}
          disabled={typeAction === 'INFO'}
          onChange={(e) => setData({ ...data, Title: e.target.value })}
        />
        <CFormInput
          type='text'
          id='reporter'
          label='Reporter'
          placeholder='Enter your reporter name'
          value={data.Reporter}
          disabled={typeAction === 'INFO'}
          onChange={(e) => setData({ ...data, Reporter: e.target.value })}
        />
        <CFormTextarea
          id='body'
          label='Body'
          rows={3}
          value={data.Body}
          disabled={typeAction === 'INFO'}
          onChange={(e) =>
            setData({ ...data, Body: e.target.value })
          }></CFormTextarea>
        <CFormSelect
          label='Category'
          value={data.CategoryID}
          onChange={(e) => setData({ ...data, CategoryID: e.target.value })}
          disabled={typeAction === 'INFO'}
          aria-label='Choose the category...'>
          <option>Choose the category...</option>
          {optionsCategory.map((option: any) => {
            return <option value={option.value}>{option.label}</option>;
          })}
        </CFormSelect>
      </CForm>
    </Fragment>
  );
}

export default ArticleCreate;
