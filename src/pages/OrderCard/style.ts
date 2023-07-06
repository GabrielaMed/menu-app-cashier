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

export const RowCardInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 1rem;
  border-bottom: 1px solid #f3f2f2;
`;

export const RowOrderInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 1rem;

  &:not(:last-child) {
    border-bottom: 1px solid #f3f2f2;
  }
`;

export const Order = styled.div`
  width: 100%;
  display: flex;
  box-sizing: border-box;
  border-bottom: 1px solid #e6e5e5;
  gap: 1rem;

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 390px) {
    flex-wrap: wrap;
  }
`;

export const ImageBox = styled.div`
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 5rem;
  max-height: 3.5rem;
  border-radius: 5px;
  overflow: hidden;

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
  }
`;

export const OrderInfo = styled.div`
  width: 12rem;
  height: fit-content;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  @media (min-width: 390px) {
    width: 100%;
  }
`;

export const ProductInfo = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const OrderInfoAdditionals = styled.div`
  width: 100%;
  font-size: 0.9rem;
  display: flex;
  flex-direction: column;
  padding-bottom: 0.5rem;
  span {
    display: flex;
    justify-content: space-between;
  }
  border-bottom: 1px solid #c4c4c4;
`;

export const OrderInfoObservation = styled.div`
  width: 100%;
  font-size: 0.9rem;
  text-align: justify;
`;
