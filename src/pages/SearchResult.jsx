import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';
import Button from '../components/Button';
import Appticon from '../assets/images/appticon.png';
import { media } from '../styles/GlobalStyle';
import { registerCosmeticFromSearch } from '../api';

export default function SearchResult() {
  const navigate = useNavigate();
  const location = useLocation();

  const searchResults = location.state?.searchResults || [];
  const searchId = location.state?.searchId;

  const [selectedListId, setSelectedListId] = useState(
    searchResults.length === 1 ? searchResults[0]?.itemId : null
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!searchResults || searchResults.length === 0) {
    return (
      <Container>
        <Header title="검색 결과" variant="back" />
        <Content>
          <MainTitle>검색 결과가 없습니다.</MainTitle>
          <Button onClick={() => navigate('/register/search-cosmetic')}>
            다시 검색하기
          </Button>
        </Content>
      </Container>
    );
  }

  const handleConfirmClick = async () => {
    if (isSubmitting) return;

    const targetId = searchResults.length === 1 ? searchResults[0].itemId : selectedListId;

    if (!targetId) {
      alert('사용 중인 제품을 선택해 주세요.');
      return;
    }

    try {
      setIsSubmitting(true);

      const res = await registerCosmeticFromSearch({
        searchId,
        itemId: targetId,
      });

      if (res.data.isSuccess) {
        if (location.state?.returnUrl) {
          navigate(location.state.returnUrl, {
            state: {
              restoredForm: location.state.previousForm,
              reopenModal: true,
            },
          });
        } else {
          navigate('/pouch-redirect');
        }
      } else {
        alert(res.data.message || '화장품 등록에 실패했습니다.');
      }
    } catch (error) {
      console.error('검색 화장품 등록 실패:', error);
      alert(error.message || '등록 중 오류가 발생했습니다. 다시 시도해 주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRetrySearch = () => {
    navigate('/register/search-cosmetic', {
      state: {
        returnUrl: location.state?.returnUrl,
        previousForm: location.state?.previousForm,
      },
    });
  };

  const handleGoToCustom = () => {
    navigate('/register/custom-name', {
      state: {
        returnUrl: location.state?.returnUrl,
        previousForm: location.state?.previousForm,
      },
    });
  };

  return (
    <Container>
      <Header title="검색 결과" variant="back" />
      <Content>
        {searchResults.length === 1 ? (
          <>
            <MainTitle>이 제품이 맞으신가요?</MainTitle>
            <SingleProductCard>
              <ImagePlaceholder>
                {searchResults[0]?.imageUrl ? (
                  <ProductImage src={searchResults[0].imageUrl} alt={searchResults[0]?.productName} />
                ) : (
                  <ProductImage $fill src={Appticon} alt={searchResults[0]?.productName} />
                )}
              </ImagePlaceholder>
              <ProductName>{searchResults[0]?.productName}</ProductName>
            </SingleProductCard>
          </>
        ) : (
          <>
            <MainTitle $alignLeft>
              이 중 어떤 제품을
              <br />
              사용하고 계신가요?
            </MainTitle>
            <ProductList>
              {searchResults.map((item) => {
                const isChecked = selectedListId === item.itemId;
                return (
                  <ListItem key={item.itemId} $isSelected={isChecked} onClick={() => setSelectedListId(item.itemId)}>
                    <RadioButton $isChecked={isChecked}>{isChecked && <RadioInnerCircle />}</RadioButton>
                    <SmallImagePlaceholder $isSelected={isChecked}>
                      {item.imageUrl ? (
                        <img src={item.imageUrl} alt={item.productName} />
                      ) : (
                        <img src={Appticon} size={30} strokeWidth={1.5} />
                      )}
                    </SmallImagePlaceholder>
                    <ListItemTextWrap>
                      <ListItemBrand>{item.brandName}</ListItemBrand>
                      <ListItemName>{item.productName}</ListItemName>
                    </ListItemTextWrap>
                  </ListItem>
                );
              })}
            </ProductList>
          </>
        )}

        <ButtonWrapper>
          <Button onClick={handleConfirmClick} disabled={(searchResults.length > 1 && !selectedListId) || isSubmitting}>
            {isSubmitting ? '등록 중...' : '확인'}
          </Button>
          <ButtonGroup>
            <Button onClick={handleRetrySearch} disabled={isSubmitting}>
              다시 검색
            </Button>
            <Button onClick={handleGoToCustom} disabled={isSubmitting}>
              직접 입력하기
            </Button>
          </ButtonGroup>
        </ButtonWrapper>
      </Content>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  max-width: 430px;
  min-height: 100vh;
  margin: 0 auto;
  position: relative;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

const Content = styled.main`
  flex: 1;
  width: 100%;
  gap: 10px;
  padding: 10px 20px 30px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
`;

const MainTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  line-height: 1.35;
  color: #000000;
  margin-top: 55px;
  margin-bottom: 30px;

  width: ${(props) => (props.$alignLeft ? '100%' : 'auto')};
  text-align: ${(props) => (props.$alignLeft ? 'left' : 'center')};
  align-self: ${(props) => (props.$alignLeft ? 'flex-start' : 'center')};

  @media ${media.mobileM} {
    font-size: 28px;
    margin-top: 80px;
    margin-bottom: 50px;
  }
`;

const SingleProductCard = styled.div`
  width: 80%;
  height: 280px;
  background-color: #e9e9e9;
  border-radius: 20px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: auto;

  box-shadow: 2px 2px 2px rgba(73, 73, 73, 0.25);

  @media ${media.mobileM} {
    height: 340px;
  }
`;

const ImagePlaceholder = styled.div`
  width: 160px;
  height: 160px;
  flex-shrink: 0;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  text-align: center;
  font-size: 14px;
  font-weight: 700;
  color: #333333;

  @media ${media.mobileM} {
    width: 200px;
    height: 200px;
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: ${({ $fill }) => ($fill ? 'cover' : 'contain')};
`;

const ProductName = styled.p`
  width: 100%;
  flex-shrink: 0;
  font-size: 15px;
  font-weight: 700;
  color: #000000;
  text-align: center;
  margin: 16px 0 0 0;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;

  @media ${media.mobileM} {
    font-size: 18px;
  }
`;

const ProductList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: auto;
`;

const ListItem = styled.div`
  width: 100%;
  min-height: 60px;
  background-color: ${(props) => (props.$isSelected ? '#e7fff7' : '#ffffff')};
  border-radius: 25px;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  border: ${(props) => (props.$isSelected ? '1px solid #02ca70' : '1px solid #dee2e6')};

  &:active {
    transform: scale(0.98);
  }

  @media ${media.mobileM} {
    min-height: 69px;
  }
`;

const RadioButton = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: ${(props) => (props.$isChecked ? '7px solid #42b58d' : '2px solid #888888')};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const RadioInnerCircle = styled.div`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background-color: #ffffff;
`;

const SmallImagePlaceholder = styled.div`
  width: 38px;
  height: 38px;
  border: ${(props) => (props.$isSelected ? '1px solid #02ca70' : '1px solid #828282')};
  border-radius: 8px;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 9px;
  font-weight: 700;
  color: #333333;
  flex-shrink: 0;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ListItemTextWrap = styled.div`
  min-width: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const ListItemBrand = styled.span`
  font-size: 11px;
  font-weight: 500;
  color: #767676;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media ${media.mobileM} {
    font-size: 12px;
  }
`;

const ListItemName = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: #111111;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media ${media.mobileM} {
    font-size: 14px;
  }
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 30px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 14px;
  width: 100%;

  button {
    flex: 1;
  }

  button:last-child,
  button:first-child {
    background-color: white;
    color: #609668;
    border: 1px solid #609668;
  }
`;
