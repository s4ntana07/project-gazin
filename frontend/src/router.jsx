import {createBrowserRouter} from 'react-router-dom';
import Login from './views/login.jsx';
import Register from './views/register.jsx';
import DefaultLayout from './components/DefaultLayout.jsx';
import GuestLayout from './components/GuestLayout.jsx';
import Home from './views/home.jsx';
import Addproduct from './views/addproduct.jsx';
import ProductTable from './views/products.jsx';
import ProductForm from './views/ProductForm.jsx';
import MakeOrder from './views/addorder.jsx';

const router = createBrowserRouter ([
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/home',
                element: <Home />,
            },
            {
                path: '/addproduct',
                element: <Addproduct/>,
            },
            {
                path: '/products',
                element: <ProductTable/>,
            },
            {
                path: '/products/:id',
                element: <ProductForm key="productUpdate" />
            },

            {
                path: '/makeorder',
                element : <MakeOrder/>
            }
        ]
    },

    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: '/login',
                element: <Login />,
            },
            {
                path: '/register',
                element:  <Register />,
            }
        ]
    },
]);

export default router;