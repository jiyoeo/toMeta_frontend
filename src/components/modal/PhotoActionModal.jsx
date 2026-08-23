import styled from 'styled-components';
import Portal from '../Portal';

const PhotoActionModal = ({ isOpen, onClose, onTakePhoto, onPickFromGallery }) => {
  if (!isOpen) return null;

  return (
    <Portal>
      <SheetOverlay onClick={onClose}>
        <SheetCard onClick={(e) => e.stopPropagation()}>
          <SheetButton type="button" onClick={onTakePhoto}>
            사진 촬영
          </SheetButton>
          <SheetButton type="button" onClick={onPickFromGallery}>
            앨범에서 선택
          </SheetButton>
          <CancelButton type="button" onClick={onClose}>
            취소
          </CancelButton>
        </SheetCard>
      </SheetOverlay>
    </Portal>
  );
};

export default PhotoActionModal;

const SheetOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  max-width: 430px;
  margin: 0 auto;
  background-color: rgba(98, 98, 98, 0.3);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  z-index: 9999;
  padding: 0 12px 12px;
`;

const SheetCard = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const SheetButton = styled.button`
  width: 100%;
  background-color: #fdfdfd;
  border: 1px solid #82bf8b;
  border-radius: 14px;
  padding: 14px;
  font-size: 14px;
  font-weight: 500;
  color: #141212;
  cursor: pointer;
  outline: none;
  transition: all 0.2s ease;

  &:active {
    background-color: #e5f2e8;
    transform: scale(0.98);
  }
`;

const CancelButton = styled(SheetButton)`
  border: none;
  color: #828282;
  font-weight: 600;
`;
