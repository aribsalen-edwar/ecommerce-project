import React from 'react'
import styles from './NotFound.module.css'
import eror from '../../img/eror.svg'

export default function NotFound() {
  return (
    <section>
      <img src={eror} className='w-100 text-center' alt="notfound404" />
    </section>
  )
}
