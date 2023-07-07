import { AxiosError } from 'axios';
import {
  CloseButton,
  Container,
  Content,
  ImageBox,
  Navbar,
  Order,
  OrderCardContainer,
  OrderInfo,
  OrderInfoAdditionals,
  OrderInfoObservation,
  ProductInfo,
  RowCardInfo,
  RowOrderInfo,
} from './style';
import { IToastType } from '../../utils/Interface/Toast';
import { api } from '../../services/api';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const total = ordersData[0]?.Order_products?.reduce((acc, orderProducts) => {
    const productTotal =
      (orderProducts?.product?.price ?? 0) * (orderProducts?.quantity ?? 0);

    const additionalTotal = orderProducts?.additionals
      ? Object.values(orderProducts.additionals).reduce(
          (acc, additional) =>
            acc +
            (additional?.price
              ? additional.price * (additional.quantity ?? 0)
              : 0),
          0
        )
      : 0;

    return acc + productTotal + (additionalTotal ?? 0);
  }, 0);

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
        setLoading(false);
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

  const handleCloseOrderCard = async (orderCardId: number) => {
    try {
      setLoading(true);
      const response = await api.post(`orders_card/${orderCardId}/status`, {
        newStatus: 'fechado',
      });

      if (response) {
        setShowToast(true);
        setToastMessageType(IToastType.success);
        setToastMessage(`Comanda fechada com sucesso!`);

        setTimeout(() => {
          navigate(`/`);
        }, 3000);
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        setShowToast(true);
        setToastMessageType(IToastType.error);
        setToastMessage(`Error: ${err?.response?.data}`);
      }
    }
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
                <RowCardInfo>
                  <Row className='rowOrdersCardInfo'>
                    <Col>Mesa: {order.tableNumber}</Col>
                    <Col
                      style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'flex-end',
                      }}
                    >
                      Data: {formatDate(order.Order_card[0].dateTime)}
                    </Col>
                  </Row>
                  <Row className='rowOrdersCardInfo'>
                    <Col>
                      Total:{' '}
                      <strong>
                        {Number(total).toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        })}
                      </strong>
                    </Col>
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
                      <CloseButton
                        onClick={() =>
                          handleCloseOrderCard(order.Order_card[0].id)
                        }
                      >
                        Fechar
                      </CloseButton>
                    </Col>
                  </Row>
                </RowCardInfo>
                {order.Order_products.map((item, idx) => (
                  <RowOrderInfo>
                    <Order key={idx}>
                      {item?.product?.Image ? (
                        <ImageBox>
                          <img
                            src={
                              process.env.REACT_APP_IMAGE_URL! +
                              item.product.Image[0].fileName
                            }
                            alt=''
                          />
                        </ImageBox>
                      ) : null}
                      <OrderInfo>
                        <ProductInfo>
                          {item.product.name}
                          <strong>
                            {Number(
                              item.quantity * (item?.product?.price ?? 0)
                            ).toLocaleString('pt-BR', {
                              style: 'currency',
                              currency: 'BRL',
                            })}
                          </strong>
                        </ProductInfo>
                        {(item.additionals?.length ?? 0) > 0 ? (
                          <OrderInfoAdditionals>
                            <strong>Adicionais: </strong>
                            {Array.isArray(item.additionals)
                              ? item.additionals.map((additional, idx) => (
                                  <span key={idx}>
                                    <span>
                                      {additional.quantity} - {additional.name}
                                    </span>
                                    <span>
                                      {Number(
                                        (additional.quantity ?? 0) *
                                          (additional.price ?? 0)
                                      ).toLocaleString('pt-BR', {
                                        style: 'currency',
                                        currency: 'BRL',
                                      })}
                                    </span>
                                  </span>
                                ))
                              : null}
                          </OrderInfoAdditionals>
                        ) : null}

                        {item.observation ? (
                          <OrderInfoObservation>
                            <strong>Observação:</strong> {item.observation}
                          </OrderInfoObservation>
                        ) : null}
                      </OrderInfo>
                    </Order>
                  </RowOrderInfo>
                ))}
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
