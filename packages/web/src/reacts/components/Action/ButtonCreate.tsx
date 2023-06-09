import { CButton } from '@coreui/react';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

function ButtonCreate({ setOpenModal, module, setTypeAction }: any) {
  const handleClick = () => {
    setOpenModal(true);
    setTypeAction('CREATE');
  };
  return (
    <Wrapper>
      <CButton color='success' variant='outline' onClick={handleClick}>
        <FontAwesomeIcon icon={faPlusCircle} size='lg' /> Add new {module}
      </CButton>
    </Wrapper>
  );
}

export default ButtonCreate;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  margin: 20px 0;
`;
