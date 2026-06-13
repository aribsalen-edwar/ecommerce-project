import React, { useContext, useEffect, useState } from 'react'
import styles from './Wishes.module.css'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { wishesContext } from '../../Context/WishesContext'

export default function Wishes() {
  const [wishesDetails, setWishesDetails] = useState({})  // FIXED: Capital W
  let {getWishes, deleteProductFromWishes, updateProductQuantity, setNumOfWishesItems} = useContext(wishesContext)

  async function removeItem(id){
    let {data} = await deleteProductFromWishes(id)
    console.log(data);
    setWishesDetails(data)
    setNumOfWishesItems(data.numOfWishesItems)
  }

  async function updateCount(id, count){
    let {data} = await updateProductQuantity(id, count)
    setWishesDetails(data)
  }
  
  async function getWishesDetails(){
    let {data} = await getWishes()  // FIXED: removed 'status'
    setWishesDetails(data)  // FIXED: only one argument
  }

  useEffect(() => {
    getWishesDetails()
  }, [])

  return (
    <>
      <Helmet>
        <title>wishes</title>
      </Helmet>
      <div className="container my-5">
        <div className="mx-auto w-100 bg-light p-5">
          <h1 className='mb-3'>Wishes shop</h1>
          <div className="d-flex justify-content-between align-items-center">
            <h3 className='h5'>total wishes items : <span className='text-success'> {wishesDetails.numOfWishesItems} </span></h3>
          </div>

          {wishesDetails.data?.map((ele) => (  // Added ? for safety
            <div key={ele.product._id} className="row py-2 border-bottom">
              <div className="col-md-1 ">
                <img src={ele.product.imageCover} className="w-100" alt="" />  {/* FIXED: changed data to ele.product */}
              </div>
              <div className="col-md-11">
                <div className="d-flex justify-content-between">
                  <div className="left-side">
                    <h4>{ele.product.title}</h4>
                    <p>{ele.price}</p>
                  </div>
                </div>
                <button className='btn text-danger p-0' onClick={() => removeItem(ele.product._id)}> 
                  <i className='fa fa-trash-can'> Remove </i>
                </button>
              </div>
            </div>
          ))}
      
          <Link className='btn bg-dark mt-5 w-100 text-white' to={'/Cart'}> To Cart</Link>
        </div>
      </div>
    </>
  )
}