import { createBrowserRouter } from 'react-router-dom';
import { lazy } from 'react';
import Suspense from 'components/suspense';
import ProtectedRoute from 'components/protected-route';
import Layout from 'components/layout';

const Login = Suspense(lazy(() => import('pages/login')));
const ProductList = Suspense(lazy(() => import('pages/product-list')));
const ProductDetails = Suspense(lazy(() => import('pages/product-details')));

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    element: <Layout />,
    children: [
      {
        path: '/product',
        element: (
          <ProtectedRoute>
            <ProductList />
          </ProtectedRoute>
        ),
      },
      {
        path: '/product/details/:productId',
        element: (
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default routes;
