import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react';

function RemoveModal({ visibility, setVisibility, onRemove }: any) {
  return (
    <CModal
      alignment='center'
      visible={visibility}
      onClose={() => setVisibility(false)}>
      <CModalHeader>
        <CModalTitle>Removing...</CModalTitle>
      </CModalHeader>
      <CModalBody>Do you really want to delete?</CModalBody>
      <CModalFooter>
        <CButton color='secondary' onClick={() => setVisibility(false)}>
          Close
        </CButton>
        <CButton color='danger' onClick={onRemove}>
          Remove
        </CButton>
      </CModalFooter>
    </CModal>
  );
}

export default RemoveModal;
