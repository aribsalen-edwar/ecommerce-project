import React, { useContext, useEffect, useState } from 'react'
import styles from './Cart.module.css'
import { Helmet } from 'react-helmet'
import { CartContext } from '../../Context/CartContext'
import { Oval } from 'react-loader-spinner'
import { Link } from 'react-router-dom'

export default function Cart() {
  const[cartDetails,setCartDetails] = useState ({})
  let {getCart,deleteProductFromCart,updateProductQuantity,setNumOfCartItems} = useContext(CartContext)

  async function  removeItem (id){
   let {data} = await deleteProductFromCart(id)
   console.log(data);
   setCartDetails (data)
   setNumOfCartItems (data.numOfCartItems)

  }
  async function  updateCount (id,count){
   let {data} = await updateProductQuantity(id,count)
   setCartDetails (data)

  }
  
  async function getCartDetails(){
    let  {data } = await getCart()
    console.log(data);
    setNumOfCartItems (data.numOfCartItems)
    setCartDetails (data)
  }
  useEffect (() => {
    getCartDetails ()
  },[])
  return (
    <>
      <Helmet>
               <title>Cart</title>
      </Helmet>
      {cartDetails?.data ?     <div className="container my-5">
      <div className="mx-auto w-100 bg-light p-5">
        <h1 className='mb-3'>Cart shop</h1>
        <div className="d-flex justify-content-between align-items-center">
        <h3 className='h5'>total price : <span className='text-success'>{cartDetails.data.totalCartPrice}</span></h3>
        <h3 className='h5'>total cart items : <span className='text-success'> {cartDetails.numOfCartItems} </span></h3>
        </div>
        {cartDetails.data.products.map((ele) =>  <div key ={ele.product._id} className="row py-2 border-bottom">
        <div className="col-md-1 ">
          <img src={ele.product.imageCover} className="w-100"  alt="" />
        </div>
        <div className="col-md-11">
          <div className="d-flex justify-content-between">
            <div className="left-side">
              <h4>{ele.product.title}</h4>
              <p>{ele.price}</p>
            </div>
            <div className="right-side">
              <button onClick={() => updateCount  (ele.product._id, ele.count-1)} className='btn btn-primary'>-</button>
              <span className='mx-2'>{ele.count}</span>
              <button onClick={() => updateCount  (ele.product._id, ele.count+1)} className='btn btn-primary'>+</button>
            </div>
            </div>
            <button className='btn text-danger p-0' onClick={() => removeItem (ele.product._id)}> <i className='fa fa-trash-can'> Remove </i></button>
          </div>
        </div>
         )}
      
      <Link className='btn bg-dark mt-5 w-100 text-white' to={'/Checkout'}> Checkout</Link>
      </div>
    </div> :  <Oval
  visible={true}
  height="80"
  width="80"
  color="#4fa94d"
  ariaLabel="oval-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />}


    </>
  )
}
