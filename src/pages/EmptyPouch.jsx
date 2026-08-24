import styled from 'styled-components';
import NavigationBar from '../components/NavigationBar';
import Img from '../assets/images/dr-acne/surprised-dr.svg';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import { media } from '../styles/GlobalStyle';

export default function EmptyPouch() {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate('/register/search-cosmetic');
  };

  return (
    <Container>
      <Header title="화장품 " />

      <ContentArea>
        <ImagePlaceholder src={Img} alt="놀란 여박사" />

        <RegisterButton onClick={handleRegister}>
          <PlusIcon>+</PlusIcon>
          <ButtonText>내 화장품 등록하기</ButtonText>
        </RegisterButton>
      </ContentArea>

      <NavigationBar />
    </Container>
  );
}

const Container = styled.div`
  margin: 0;
  height: 100vh;
  padding-bottom: calc(73px + env(safe-area-inset-bottom, 0px));
  padding-top: env(safe-area-inset-top);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media ${media.mobileM} {
    margin: 0;
  }
`;

const ContentArea = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 17px;

  @media ${media.mobileM} {
    padding: 0 20px;
  }
`;

const ImagePlaceholder = styled.img`
  width: 70%;
  height: auto;
  object-fit: contain;
  margin-bottom: 34px;

  @media ${media.mobileM} {
    width: 70%;
    margin-bottom: 40px;
  }
`;

const RegisterButton = styled.button`
  width: 187px;
  height: 46px;
  background-color: #ffffff;
  border: 1.5px dashed #b3b3b3;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  cursor: pointer;

  &:active {
    background-color: #f8f8f8;
  }

  @media ${media.mobileM} {
    width: 220px;
    height: 54px;
    gap: 8px;
  }
`;

const PlusIcon = styled.span`
  font-size: 17px;
  font-weight: 500;
  color: #003b00;

  @media ${media.mobileM} {
    font-size: 20px;
  }
`;

const ButtonText = styled.span`
  font-size: 17px;
  font-weight: 700;
  color: #003b00;

  @media ${media.mobileM} {
    font-size: 20px;
  }
`;
