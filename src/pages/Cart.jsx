import { IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { removeProduct, clearCartItems } from '../store/slices/Cart';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const Cart = () => {
    const user = useLoaderData()

    const navigator = useNavigate()

    const cartItems = useSelector(state => state.cart)
    const dispatcher = useDispatch()

    function removeCartItem(product) {
        dispatcher(removeProduct(product.id))
    }
    function clearCart() {
        dispatcher(clearCartItems())
    }

    useEffect(()=>{
        if(!user){
            return navigator('/login')
        }
    })

    return (
        <div>
            <h3>Cart</h3>
            {cartItems.length > 0 ?
                cartItems.map(prod => <div id='cart__detail' key={prod.id}>
                    <img style={{ height: '30px', width: '30px', cursor: 'pointer' }} onClick={() => navigator(`/product/${prod.id}`)} src={prod['images'][0]} alt="" />
                    <h3 style={{ cursor: 'pointer' }} onClick={() => navigator(`/product/${prod.id}`)} >{prod.title}</h3>
                    <h5>{prod.price}</h5>
                    <h6>{prod.rating}</h6>
                    <IconButton onClick={() => removeCartItem(prod)} aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                </div>) : <h1>Cart is Empty</h1>
            }

            <button onClick={() => clearCart()} disabled={cartItems.length === 0}>Clear Cart</button>
        </div>
    )
}
