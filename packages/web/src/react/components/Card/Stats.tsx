import {
  CButton,
  CCard,
  CCardBody,
  CCardText,
  CCardTitle,
} from '@coreui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

function Stats({ count, module, color, icon }: any) {
  return (
    <CustomCard color={color} textColor='white'>
      <CCardBody>
        <CustomTitle>
          <FontAwesomeIcon icon={icon} size='lg' />
          <Title>{module}</Title>
        </CustomTitle>
        <CCardText>Total items: {count}</CCardText>
        {/* <CButton href='#'>Go somewhere</CButton> */}
      </CCardBody>
    </CustomCard>
  );
}

export default Stats;

const CustomCard = styled(CCard)`
  min-width: 400px;
  padding: 20px;
`;

const CustomTitle = styled(CCardTitle)`
  font-size: 2rem;
`;

const Title = styled.span`
  margin-left: 20px;
`;
