import { useFormik } from 'formik'
import React, { useContext } from 'react'
import { CartContext } from '../../Context/CartContext';


const Checkout =() => {
  let {onlinePayment} = useContext(CartContext)

 async function payment (values){
    console.log(values,"im payment");
   let {data} = await onlinePayment(values)
   console.log(data);
   window.location.href= data.session.url
  }

  let formik = useFormik ({
    initialValues : {
      "details": "",
      "phone": "",
      "city": ""
    },
    onSubmit: payment
  })
  return (
    <>
   <div className="container">
    <div className="mx-auto bg-light p-5">
    <h2>shipping Address</h2>
    <form onSubmit={formik.handleSubmit} >
        <div className="form-group mb-3">
      <label htmlFor="">Details</label>
      <input type="text" className='form-control' id='details' name='details' value={formik.values.details} onChange={formik.handleChange} />
      </div>
      <div className="form-group mb-3">
      <label htmlFor="">phone</label>
      <input type="text" className='form-control' id='phone' name='phone' value={formik.values.phone} onChange={formik.handleChange} />
      </div>
    
      <div className="form-group mb-3">
      <label htmlFor="">City</label>
      <input type="text" className='form-control' id='city' name='city' value={formik.values.city} onChange={formik.handleChange} />
      </div>
      <button className='btn w-100 bg-dark text-white'>pay now </button>
    </form>
   </div>
   </div>
    </>
  )
}
export default Checkout