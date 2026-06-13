import axios from 'axios'
import React, { useContext } from 'react'
import { Oval } from 'react-loader-spinner'
import { useQuery } from 'react-query'
import { useParams, useNavigate } from 'react-router-dom'
import Slider from "react-slick";
import { CartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast'

const Details = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true
  };
  
  let navigate = useNavigate();
  let { addToCart, setNumOfCartItems } = useContext(CartContext);
  let params = useParams();

  function getProductDitails(id) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  }
  
  let { data, isError, isLoading } = useQuery("details", () => getProductDitails(params.id))

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
      if (res.data.status === "success") {
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
        /> : <div className="row align-items-center">
          <div className="col-md-4">
            <Slider {...settings}>
              {data?.data?.data.images.map((ele, index) => <img key={index} src={ele} alt="" />)}
            </Slider>
          </div>
          <div className="col-md-8">
            <h2>{data?.data?.data.title}</h2>
            <p>{data?.data?.data.description}</p>
            <p>{data?.data?.data.category.name}</p>
            <div className="d-flex justify-content-between">
              <p>{data?.data?.data.price}</p>
              <h5><i className='fa fa-star rating-color'> {data?.data?.data.category.rating}</i></h5>
            </div>
            <button onClick={() => addCart(data?.data?.data.id)} className='btn btn-info w-100'> Add to cart</button>
          </div>
        </div>}
      </div>
    </>
  )
}

export default Details