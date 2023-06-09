import { CForm, CFormInput } from '@coreui/react';
import { Fragment } from 'react';

function CategoryCreate({ typeAction, setData, data }: any) {
  return (
    <Fragment>
      <CForm>
        <CFormInput
          type='text'
          id='title'
          label='Category Title'
          placeholder='Enter your title'
          value={data.Title}
          onChange={(e) => setData({ ...data, Title: e.target.value })}
          disabled={typeAction === 'INFO'}
        />
      </CForm>
    </Fragment>
  );
}

export default CategoryCreate;
