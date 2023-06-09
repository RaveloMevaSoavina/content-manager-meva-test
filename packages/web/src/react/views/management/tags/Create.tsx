import { CForm, CFormInput } from '@coreui/react';
import { Fragment } from 'react';

function TagCreate({ typeAction, setData, data }: any) {
  return (
    <Fragment>
      <CForm>
        <CFormInput
          type='text'
          id='title'
          label='Tag Title'
          placeholder='Enter your title'
          disabled={typeAction === 'INFO'}
          value={data.Title}
          onChange={(e) => setData({ ...data, Title: e.target.value })}
        />
      </CForm>
    </Fragment>
  );
}

export default TagCreate;
