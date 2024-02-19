import React, {useEffect, useState} from 'react'
import Classes from './ProductDetail.module.css'
import Layout from '../../components/Layout/Layout'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { productURL } from '../../API/endPoints'
import ProductCard from '../../components/Product/ProductCard'
import Loader from '../../components/Loader/Loader'

function ProductDetail() {
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false)
  const {productId} = useParams ()
  
  useEffect(() => {
    setIsLoading(true)
    axios.get(`${productURL}/products/${productId}`)
    .then((res)=>{
      setProduct(res.data);
      setIsLoading(false)
    }).catch((err)=>{
      console.log(err)
      setIsLoading(false)
    }) 
  }, []);
  return (
    <Layout>
      {isLoading? (<Loader />) :(<ProductCard 
      product={product}
      flex ={true}
      renderDesc={true}
      renderAdd={true}

      />)}
     
    </Layout>
  )
}

export default ProductDetail
