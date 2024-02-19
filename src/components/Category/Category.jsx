import React from 'react';
import {categoryData} from './CategoryFullData'
import CategoryCard from './CategoryCard';
import classes from './category.module.css'

function Category() {
    return (
        <section className={classes.category__container}>
            {
            categoryData.map((info)=>{
                return <CategoryCard data ={info} />
            })
                           
            }            
        </section>
    )
}
   


export default Category;
