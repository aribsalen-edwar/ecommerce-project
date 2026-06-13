import { render } from '@testing-library/react'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Oval, ThreeCircles } from 'react-loader-spinner'
import { useQuery } from 'react-query'
import { Link, useNavigate } from 'react-router-dom'
import { CartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast'
import { wishesContext } from '../../Context/WishesContext'

const FeatureProducts = () => {
  let navigate = useNavigate();
  let { addToCart, setNumOfCartItems } = useContext(CartContext);
  let { addToWishes, setNumOfWishestItems } = useContext(wishesContext);

  function getProducts() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
  }
  let { data, isLoading, isFetching } = useQuery("featureProducts", getProducts)

  async function addCart(id) {
    // Check if user is logged in
    if (!localStorage.getItem("userToken")) {
      toast.error("Please login first to add items to cart");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      return;
    }

    try {
      let res = await addToCart(id);
      if (res.data.status == "success") {
        toast.success('Product added successfully.');
        setNumOfCartItems(res.data.numOfCartItems);
      } else {
        toast.error('Cannot add it');
      }
    } catch (error) {
      toast.error("Please login first");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  }

  async function addWishes(id) {
    // Check if user is logged in
    if (!localStorage.getItem("userToken")) {
      toast.error("Please login first to add items to wishes");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      return;
    }

    try {
      let res = await addToWishes(id);
      if (res.data.status == "success") {
        toast.success('Product added successfully.');
        setNumOfWishestItems(res.data.numOfWishesItems);
      } else {
        toast.error('Cannot add it');
      }
    } catch (error) {
      toast.error("Please login first");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  }

  return (
    <>
      <div className="container">
        {isLoading ? <Oval
          visible={true}
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="oval-loading"
          wrapperStyle={{}}
          wrapperClass=""
        /> : <div className="row">
          {data?.data?.data.map((ele) => <div key={ele.id} className="col-md-2 py-3 ">
            <div className="product px-2 py-3" >
              <Link to={'/details/' + ele.id}>
                <img src={ele.imageCover} alt={ele.name} className="w-100" />
                <p className='text-main'>{ele.category.name}</p>
                <h3 className='h6'>{ele.title.split(" ").slice(0, 3).join(" ")}</h3>
                <div className="d-flex justify-content-between">
                  <p>{ele.price}EGP</p>
                  <p>
                    <i className='fa fa-star rating-color'></i> {ele.ratingAverage}
                  </p>
                </div>
              </Link>
              <button onClick={() => addWishes(ele.id)} className='btn btn-light heart-color w-100 py-2 my-1 fs-6'> Add to wishes
                <i className="fa-solid fa-heart heart-color fs-6 px-1"></i>
              </button>
              <button onClick={() => addCart(ele._id)} className='btn btn-info w-100 py-2'> Add to cart</button>
            </div>
          </div>)}
        </div>}
      </div>
    </>
  )
}

export default FeatureProducts