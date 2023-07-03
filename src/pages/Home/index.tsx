import { AxiosError } from 'axios';
import { Header } from '../../components/Header';
import { Container, Content, TableCircle } from './style';
import { IToastType } from '../../utils/Interface/Toast';
import { api } from '../../services/api';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { GlobalContext } from '../../shared/GlobalContext';
import ReactLoading from 'react-loading';
import { ToastMessage } from '../../components/Toast';
import { ITable } from '../../utils/Interface/Table';
import { IOrder } from '../../utils/Interface/Order';
import { IOrderCard } from '../../utils/Interface/OrderCard';

export const Home = () => {
  const { companyIdURL } = useParams();
  const [showToast, setShowToast] = useState(false);
  const [toastMessageType, setToastMessageType] = useState<IToastType>(
    IToastType.unknow
  );
  const [toastMessage, setToastMessage] = useState('');
  const navigate = useNavigate();
  const { setCompanyId, companyId, setTableNumber } = useContext(GlobalContext);
  const [loading, setLoading] = useState(false);
  const [tables, setTables] = useState<ITable[]>([]);
  const [ordersData, setOrdersData] = useState<IOrder[]>([]);

  useEffect(() => {
    setLoading(true);
    if (companyIdURL) {
      setCompanyId(companyIdURL ?? '');

      navigate('/');
    }
    // eslint-disable-next-line
  }, [companyIdURL]);

  useEffect(() => {
    if (companyId) {
      setLoading(false);
    }
  }, [companyId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await api.get(`${companyId}/tables`);

        if (response) {
          setTables(response.data.tables);
        }

        setLoading(false);
      } catch (err) {
        if (err instanceof AxiosError) {
          setShowToast(true);
          setToastMessageType(IToastType.error);
          setToastMessage(`Error: ${err?.response?.data}`);
        }
      }
    };

    if (companyId) {
      fetchData();
    }
    // eslint-disable-next-line
  }, [companyId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await api.get(`order/company/${companyId}`);

        if (response.data) {
          setOrdersData(response.data);
        }

        setLoading(false);
      } catch (err) {
        if (err instanceof AxiosError) {
          setShowToast(true);
          setToastMessageType(IToastType.error);
          setToastMessage(`Error: ${err?.response?.data}`);
        }
      }
    };

    if (companyId) {
      fetchData();
    }
    // eslint-disable-next-line
  }, [companyId]);

  const getTableBackgroundColor = (tableNumber: number) => {
    const tableOrders = ordersData.filter((order) =>
      order.Order_card.some(
        (card: IOrderCard) =>
          card.tableNumber === tableNumber &&
          card.order_card_status === 'aberto'
      )
    );

    return tableOrders.length > 0 ? '#ff002b' : '#1a7431';
  };

  return (
    <>
      <ToastMessage
        setShowToast={setShowToast}
        showToast={showToast}
        toastMessage={toastMessage}
        toastMessageType={toastMessageType}
      />
      <Container>
        <Header pageName='Caixa' />
        {loading && (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <ReactLoading
              type={'cylon'}
              color={'#4B2995'}
              height={'150px'}
              width={'150px'}
            />
          </div>
        )}
        {!loading && (
          <Content>
            {tables.map((table, idx) => (
              <TableCircle
                key={idx}
                style={{
                  backgroundColor: getTableBackgroundColor(table.tableNumber),
                }}
                onClick={() => {
                  setTableNumber(table.tableNumber);
                  navigate('/orderCard');
                }}
              >
                {table.tableNumber}
              </TableCircle>
            ))}
          </Content>
        )}
      </Container>
    </>
  );
};
