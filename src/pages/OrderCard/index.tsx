import { AxiosError } from 'axios';
import { Header } from '../../components/Header';
import {
  CloseButton,
  Container,
  Content,
  Navbar,
  OrderCardContainer,
} from './style';
import { IToastType } from '../../utils/Interface/Toast';
import { api } from '../../services/api';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { GlobalContext } from '../../shared/GlobalContext';
import ReactLoading from 'react-loading';
import { ToastMessage } from '../../components/Toast';
import { IOrder } from '../../utils/Interface/Order';
import { MdArrowBack } from 'react-icons/md';
import { OrderStatus } from '../../utils/Enum/OrderStatus';
import { Col, Row } from 'react-bootstrap';

export const OrderCard = () => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessageType, setToastMessageType] = useState<IToastType>(
    IToastType.unknow
  );
  const [toastMessage, setToastMessage] = useState('');
  const navigate = useNavigate();
  const { tableNumber, companyId } = useContext(GlobalContext);
  const [loading, setLoading] = useState(false);
  const [ordersData, setOrdersData] = useState<IOrder[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await api.post(`orders_card/table/${tableNumber}`, {
          companyId,
        });

        if (response) {
          const filteredOrders = response.data[0].filter(
            (order: IOrder) => order.statusOrder === OrderStatus.entregue
          );
          setOrdersData(filteredOrders);
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
  }, [companyId, tableNumber]);

  useEffect(() => {
    console.log('HERE', ordersData);
  }, [ordersData]);

  const formatDate = (dateTime: string) => {
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    const date = new Date(dateTime);
    return date.toLocaleTimeString('pt-BR', options);
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
        <Navbar>
          <span>
            <MdArrowBack
              size={24}
              style={{ cursor: 'pointer' }}
              onClick={() => navigate(`/`)}
            />
          </span>
          <span>Detalhes comanda</span>
        </Navbar>
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
        {!loading && ordersData.length > 0 ? (
          ordersData.map((order, idx) => (
            <Content key={idx}>
              <OrderCardContainer>
                <Row
                  className='rowOrdersCardInfo'
                  style={{
                    borderBottom: '1px solid #F3F2F2',
                    paddingBottom: '1rem',
                  }}
                >
                  <Row className='rowOrdersCardInfo'>
                    <Col>Mesa: {order.tableNumber}</Col>
                    <Col>Data: {formatDate(order.Order_card[0].dateTime)}</Col>
                  </Row>
                  <Row className='rowOrdersCardInfo'>
                    <Col>Total: R$0</Col>
                  </Row>
                  <Row className='rowOrdersCardInfo'>
                    <Col>Status: {order.Order_card[0].order_card_status}</Col>
                    <Col
                      style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'flex-end',
                      }}
                    >
                      <CloseButton>Fechar</CloseButton>
                    </Col>
                  </Row>
                </Row>
              </OrderCardContainer>
            </Content>
          ))
        ) : (
          <Content>Nenhum produto encontrado!</Content>
        )}
      </Container>
    </>
  );
};
