import { createBrowserRouter } from 'react-router';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderSuccessPage } from './pages/OrderSuccessPage';
import { WishlistPage } from './pages/WishlistPage';
import { OrdersPage } from './pages/OrdersPage';
import { OrderDetailPage } from './pages/OrderDetailPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { ProfilePage } from './pages/ProfilePage';
import { NotificationsPage } from './pages/NotificationsPage';
import { FAQPage } from './pages/FAQPage';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { AdminLayout } from './pages/admin/AdminLayout';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminProducts } from './pages/admin/AdminProducts';
import { AdminOrders } from './pages/admin/AdminOrders';
import { AdminUsers } from './pages/admin/AdminUsers';
import { AdminPayments } from './pages/admin/AdminPayments';
import { AdminDiscounts } from './pages/admin/AdminDiscounts';
import { AdminReports } from './pages/admin/AdminReports';
import { Navbar } from './components/Navbar';

// Main Layout Component
const MainLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Navbar />
    {children}
  </>
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout><HomePage /></MainLayout>,
  },
  {
    path: '/products',
    element: <MainLayout><ProductsPage /></MainLayout>,
  },
  {
    path: '/product/:id',
    element: <MainLayout><ProductDetailPage /></MainLayout>,
  },
  {
    path: '/cart',
    element: <MainLayout><CartPage /></MainLayout>,
  },
  {
    path: '/checkout',
    element: <MainLayout><CheckoutPage /></MainLayout>,
  },
  {
    path: '/order-success/:orderId',
    element: <MainLayout><OrderSuccessPage /></MainLayout>,
  },
  {
    path: '/wishlist',
    element: <MainLayout><WishlistPage /></MainLayout>,
  },
  {
    path: '/orders',
    element: <MainLayout><OrdersPage /></MainLayout>,
  },
  {
    path: '/order/:orderId',
    element: <MainLayout><OrderDetailPage /></MainLayout>,
  },
  {
    path: '/profile',
    element: <MainLayout><ProfilePage /></MainLayout>,
  },
  {
    path: '/notifications',
    element: <MainLayout><NotificationsPage /></MainLayout>,
  },
  {
    path: '/faq',
    element: <MainLayout><FAQPage /></MainLayout>,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/signup',
    element: <SignupPage />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPasswordPage />,
  },
  {
    path: '/admin/login',
    element: <AdminLoginPage />,
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <AdminDashboard />,
      },
      {
        path: 'products',
        element: <AdminProducts />,
      },
      {
        path: 'orders',
        element: <AdminOrders />,
      },
      {
        path: 'users',
        element: <AdminUsers />,
      },
      {
        path: 'payments',
        element: <AdminPayments />,
      },
      {
        path: 'discounts',
        element: <AdminDiscounts />,
      },
      {
        path: 'reports',
        element: <AdminReports />,
      },
    ],
  },
]);