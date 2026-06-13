import React from 'react'
import styles from './Categories.module.css'
import { Helmet } from 'react-helmet'
import FeatureProducts from '../FeatureProducts/FeatureProducts'
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider'

export default function Categories() {
  return (
    <>
     <Helmet>
                <title>Categories</title>
            </Helmet>
  <CategoriesSlider />
    </>
  )
}
