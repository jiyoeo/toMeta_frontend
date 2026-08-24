import styled from 'styled-components';
import { media } from '../styles/GlobalStyle';

export default function ReportHeader({ title, prevLabel, nextLabel, onPrev, onNext, nextHidden, prevIcon, nextIcon }) {
  return (
    <HeaderContainer>
      <NavGroup>
        <NavButton type="button" onClick={onPrev}>
          <NavIcon src={prevIcon} alt="이전달" />
        </NavButton>
        <NavMonthLabel>{prevLabel}</NavMonthLabel>
      </NavGroup>

      <Title>{title}</Title>

      <NavGroup $hidden={nextHidden}>
        <NavMonthLabel>{nextLabel}</NavMonthLabel>
        <NavButton type="button" tabIndex={nextHidden ? -1 : 0} onClick={onNext}>
          <NavIcon src={nextIcon} alt="다음달" />
        </NavButton>
      </NavGroup>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  flex-shrink: 0;
  height: 61px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.05);
  z-index: 100;
  background-color: #ffffff;
  box-sizing: border-box;
`;

const Title = styled.h1`
  font-size: 15px;
  font-weight: 400;
  color: #141212;
  margin: 0;
  text-align: center;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;

  @media ${media.mobileM} {
    font-size: 18px;
  }
`;

const NavGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  visibility: ${(props) => (props.$hidden ? 'hidden' : 'visible')};
  pointer-events: ${(props) => (props.$hidden ? 'none' : 'auto')};
`;

const NavMonthLabel = styled.span`
  font-size: 12px;
  color: #737373;
`;

const NavButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NavIcon = styled.img`
  width: 15px;
  height: 15px;
  object-fit: contain;
`;
