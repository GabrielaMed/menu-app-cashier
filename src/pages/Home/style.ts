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

export const TableCircle = styled.button`
  all: unset;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  color: white;
  background-color: red;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
`;
