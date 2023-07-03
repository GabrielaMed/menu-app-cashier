import { OrderStatus } from '../Enum/OrderStatus';
import { IOrderCard } from './OrderCard';
import { IOrderProduct } from './OrderProduct';

export interface IOrder {
  id: string;
  statusOrder: OrderStatus;
  Order_products: IOrderProduct[];
  Order_card: IOrderCard[];
  dateTimeOrder: string;
  tableNumber: number;
  total: number;
  orderNumber: number;
}
