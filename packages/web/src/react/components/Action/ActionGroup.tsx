import {
  faInfoCircle,
  faPencil,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

function ActionGroup({
  element,
  setType,
  setItemOpen,
  setIsNewOpen,
  setIsDeleteOpen,
}: any) {
  const handleActionClick = (type: string) => {
    setType(type);
    setItemOpen({ ...element });

    if (type === 'REMOVE') {
      setIsDeleteOpen(true);
      return;
    }

    setIsNewOpen(true);
  };
  return (
    <Wrapper>
      <Action
        icon={faTrash}
        size='lg'
        color='#DC4C64'
        title='Remove'
        onClick={() => handleActionClick('REMOVE')}
      />
      <Action
        icon={faPencil}
        size='lg'
        // color='#14A44D'
        onClick={() => handleActionClick('EDIT')}
        title='Edit'
      />
      <Action
        icon={faInfoCircle}
        size='lg'
        color='#3B71CA'
        title='Information'
        onClick={() => handleActionClick('INFO')}
      />
    </Wrapper>
  );
}

export default ActionGroup;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Action = styled(FontAwesomeIcon)`
  margin: 5px;
  cursor: pointer;
`;
