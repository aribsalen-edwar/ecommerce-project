import React from 'react'
import MainSlider from '../MainSlider/MainSlider'
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider'
import styles from './Home.module.css'
import { Helmet } from 'react-helmet'
import FeatureProducts from '../FeatureProducts/FeatureProducts'

export default function Home() {

  return (
  <>
  
  <MainSlider />
  <CategoriesSlider />
  <FeatureProducts />
  </>
  )
}
