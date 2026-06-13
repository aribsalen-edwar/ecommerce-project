import logo from './logo.svg';
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import LayOut from './components/LayOut/LayOut';
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import Products from './components/Products/Products'
import Categories from './components/Categories/Categories'
import Brands from './components/Brands/Brands'
import Cart from './components/Cart/Cart'
import Login from './components/Login/Login'
import Logout from './components/Logout/Logout'
import Register from './components/Register/Register'
import NotFound from './components/NotFound/NotFound'
import TokenContextProvider, { TokenContext } from './Context/Token';
import { useContext, useEffect } from 'react';
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes';
import Details from './components/Details/Details';
import Checkout from './components/Checkout/Checkout';
import AllOrders from './components/AllOrders/AllOrders';
import Wishes from './components/Wishes/Wishes';
import { Navigate } from 'react-router-dom';


function App() {

let {setToken} = useContext(TokenContext)
const routes = createBrowserRouter([
  {
    path: "",
    element: <LayOut />,
    children: [
      { path: "", element: <Navigate to="/home" /> },  // ADD THIS LINE
      { path: "home", element: <Home /> },
    {path:"home" ,element: <Home />},
    {path:"products" ,element: <Products/>},
    {path:"details/:id" ,element: <Details/>},
    {path:"categories" ,element: <Categories/>},
    {path:"Brand" ,element: <Brands/> },
    {path:"cart" ,element:  <Cart/>  }, 
    {path:"Checkout" ,element: <ProtectedRoutes><Checkout/></ProtectedRoutes> }, 
    {path:"allorders" ,element:  <AllOrders/>  }, 
    {path:"wishes" ,element:  <Wishes/>  }, 
    {path:"login" ,element: <Login/> }, 
    {path:"logout" ,element: <Logout/> }, 
    {path:"register" ,element: <Register/>}, 
    {path:"register" ,element: <Register/>}, 
    {path:"e-commerce" ,element: <Register/>},  
    {path:"*" ,element: <NotFound/>},
  ]}
])

useEffect (()=> {
  if(localStorage.getItem("userToken") != null){
    setToken(localStorage.getItem("userToken"))
  }
},[])

return <RouterProvider router={routes}></RouterProvider>}

export default App;
