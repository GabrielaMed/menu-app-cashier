import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`;

export const Content = styled.div`
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  gap: 0.5rem;
`;

export const Navbar = styled.div`
  width: 100%;
  height: 4rem;
  border-bottom: 1px solid #e6e5e5;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;

  span {
    width: 100%;
    display: flex;
    justify-content: center;
    font-size: 24px;
    color: #4b2995;
  }

  span:first-child {
    position: absolute;
    display: flex;
    justify-content: start;
    padding: 1rem;
  }
`;

export const OrderCardContainer = styled.div`
  background-color: #e6e5e5;
  width: 100%;
  height: 100%;
  border-radius: 6px;
  padding: 1rem;
  display: flex;
  gap: 1rem;
  flex-direction: column;
`;

export const CloseButton = styled.button`
  all: unset;
  background: #4b2995;
  color: white;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2rem;
  width: 5.5rem;
`;
