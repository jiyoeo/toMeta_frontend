import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getCosmeticOptions } from '../api/cosmetics';

export default function PouchRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkPouchStatus = async () => {
      try {
        const res = await getCosmeticOptions();
        const { sets, cosmetics } = res.data.result || {};

        if ((sets && sets.length > 0) || (cosmetics && cosmetics.length > 0)) {
          navigate('/my-pouch', { replace: true });
        } else {
          navigate('/empty-pouch', { replace: true });
        }
      } catch (error) {
        console.error('[PouchRedirect] 파우치 상태 조회 실패:', error);
        navigate('/empty-pouch', { replace: true });
      }
    };

    checkPouchStatus();
  }, [navigate]);

  return (
    <LoadingContainer>
      <LoadingText>로딩 중...</LoadingText>
    </LoadingContainer>
  );
}

const LoadingContainer = styled.div`
  min-height: 100dvh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoadingText = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: #266210;
`;