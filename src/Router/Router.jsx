import { createBrowserRouter, redirect } from "react-router-dom";
import { Cart } from "../pages/Cart";
import { Forms, action as loginAction } from "../components/Forms";
import Profile from "../pages/Profile";
import { Header } from "../components/Header";
import { Dashboard, productsLoader } from "../pages/Dashboard";
import Error from '../pages/Error'
import Product, { loader as productLoader } from "../pages/Product";
import { authProtector, checkAuthUser } from '../utils/auth.util'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Header />,
        errorElement: <Error />,
        loader: checkAuthUser,
        children: [
            {
                index: true,
                element: <Dashboard />,
                loader: productsLoader
            },
            {
                path: 'cart',
                element: <Cart />,
                loader: checkAuthUser
            },
            {
                path: 'login',
                element: <Forms />,
                action: loginAction
            },
            {
                path: "profile",
                element: <Profile />,
                loader: checkAuthUser,
            },
            {
                path: 'product/:productId',
                element: <Product />,
                loader: productLoader
            },
            {
                path: 'logout',
                action: async () => {
                    localStorage.removeItem('user')
                    return redirect('/')
                }
            }

        ]
    },
])