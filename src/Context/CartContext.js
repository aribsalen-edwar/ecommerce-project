import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let CartContext = createContext();

function getHeaders() {
    return {
        token: localStorage.getItem("userToken")
    }
}

function addToCart(id) {
    // Return error if no token
    if (!localStorage.getItem("userToken")) {
        return Promise.reject({ 
            response: { 
                data: { message: "Please login first to add items to cart" } 
            } 
        });
    }
    
    return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, {
        productId: id
    }, {
        headers: getHeaders()
    }).then((res) => res).catch((err) => err)
}

function getCart() {
    if (!localStorage.getItem("userToken")) {
        return Promise.reject({ 
            response: { 
                data: { message: "Please login first" } 
            } 
        });
    }
    
    return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers: getHeaders()
    }).then((res) => res).catch((err) => err);
}

function deleteProductFromCart(id) {
    if (!localStorage.getItem("userToken")) {
        return Promise.reject({ 
            response: { 
                data: { message: "Please login first" } 
            } 
        });
    }
    
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
        headers: getHeaders()
    }).then((res) => res).catch((err) => err);
}

function updateProductQuantity(id, count) {
    if (!localStorage.getItem("userToken")) {
        return Promise.reject({ 
            response: { 
                data: { message: "Please login first" } 
            } 
        });
    }
    
    return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
        count
    }, {
        headers: getHeaders()
    }).then((res) => res).catch((err) => err);
}

export default function CartContextProvider(props) {
    const [cartId, setCartId] = useState(null)
    const [numOfCartItems, setNumOfCartItems] = useState(null)

    function onlinePayment(shippingAddress) {
        if (!localStorage.getItem("userToken")) {
            return Promise.reject({ 
                response: { 
                    data: { message: "Please login first" } 
                } 
            });
        }
        
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`, {
            shippingAddress,
        }, {
            headers: getHeaders()
        }).then((res) => res).catch((err) => err);
    }

    async function getInitialCart() {
        if (localStorage.getItem("userToken")) {
            let { data } = await getCart()
            setNumOfCartItems(data?.numOfCartItems)
            setCartId(data?.data?._id)
        }
    }

    useEffect(() => {
        getInitialCart();
    }, [])

    return <CartContext.Provider value={{ addToCart, getCart, deleteProductFromCart, updateProductQuantity, onlinePayment, numOfCartItems, setNumOfCartItems }}>
        {props.children}
    </CartContext.Provider>
}