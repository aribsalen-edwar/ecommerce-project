import axios from 'axios'
import React, { useEffect, useState } from 'react'
import map from 'react'
import { Link } from 'react-router-dom';
import Slider from 'react-slick';

const BrandsSlider =() => {
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 1
  };

  const[Brands,setBrands] = useState([])
  async function getBrands (){
   let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
   console.log(data);
   setBrands (data.data)

  }
  useEffect (() => {
    getBrands()
  },[]) 
  return (
    <>
       <div className="container my-5">
        <h2 className='text-success'>shop with popular Brands</h2>
        
        <Slider {...settings}>
        {Brands.map(brnd =><div className=" brnd px-1">
          <Link to={'/Products'}><img src={brnd.image} height={'150'} className='w-100 border ' alt="img" /></Link>
          <h5>{brnd.name}</h5>
        </div>
        )}
        </Slider>
       </div>
  
    </>
  )
}
export default  BrandsSlider;