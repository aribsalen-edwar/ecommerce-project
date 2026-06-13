import React from 'react'
import styles from './Brands.module.css'
import { Helmet } from 'react-helmet'
import MainSlider from '../MainSlider/MainSlider'
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider'
import BrandsSlider from '../BrandsSlider/BrandsSlider'

export default function Brands() {
  return (
    <>
     <Helmet>
                <title> Brands</title>
            </Helmet>
            

        <BrandsSlider/>
           
    </>
  )
}
