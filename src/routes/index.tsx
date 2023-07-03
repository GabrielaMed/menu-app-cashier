import { Route, Routes } from 'react-router-dom';
import { Home } from '../pages/Home';
import { OrderCard } from '../pages/OrderCard';

export const AppRoutes = () => (
  <Routes>
    <Route path='/:companyIdURL' element={<Home />} />
    <Route path='/' element={<Home />} />
    <Route path='/orderCard' element={<OrderCard />} />
  </Routes>
);
