import { ReactNode, createContext, useEffect, useState } from 'react';

type GlobalContextData = {
  companyId: string;
  setCompanyId: (companyId: string) => void;
  productId: string;
  setProductId: (productId: string) => void;
  tableNumber: number;
  setTableNumber: (tableNumber: number) => void;
};

export const GlobalContext = createContext({} as GlobalContextData);

type Props = {
  children: ReactNode;
};

export const GlobalContextProvider = ({ children }: Props) => {
  const [companyId, setCompanyId] = useState(() => {
    const storedCompanyId = localStorage.getItem('companyId');
    return storedCompanyId ? storedCompanyId : '';
  });
  const [productId, setProductId] = useState('');
  const [tableNumber, setTableNumber] = useState(0);

  useEffect(() => {
    localStorage.setItem('companyId', companyId);
  }, [companyId]);

  return (
    <GlobalContext.Provider
      value={{
        companyId,
        setCompanyId,
        productId,
        setProductId,
        tableNumber,
        setTableNumber,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
