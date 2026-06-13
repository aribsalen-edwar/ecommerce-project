import axios from 'axios'
import React, { useEffect, useState } from 'react'
import map from 'react'
import Slider from 'react-slick';

const CategoriesSlider =() => {
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 1
  };

  const[categories,setCategories] = useState([])
  async function getCategories (){
   let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
   console.log(data);
   setCategories (data.data)

  }
  useEffect (() => {
    getCategories()
  },[]) 
  return (
    <>
       <div className="container my-5">
        <h2>shop popular categories</h2>
        
        <Slider {...settings}>
        {categories.map(cat =><div className="cat px-1">
          <img src={cat.image} height={'200'} className='w-100' alt="img" />
          <h5>{cat.name}</h5>
        </div>
        )}
        </Slider>
       </div>
  
    </>
  )
}
export default CategoriesSlider;