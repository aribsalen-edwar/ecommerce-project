import axios from "axios";
import { createContext } from "react";



 export let wishesContext = createContext();
 let headers ={
    headers :{
        token : localStorage.getItem('userToken')
      }
 }

 function addToWishes(id){
   return axios.post(`https://ecommerce.routemisr.com/api/v1/cart` ,{
        productId: id
 },{
    headers
    }).then ((res) => res)
    .catch((err) => err);

 } 
 function getWishes(id){
   return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist` ,{
        productId: id
 },{
    headers
    }).then ((res) => res)
    .catch((err) => err);

 } 
 
 export default function WishesContextprovider (props){

    return <wishesContext.Provider value={{addToWishes,getWishes}}>
     {props.children}
    </wishesContext.Provider>
 }