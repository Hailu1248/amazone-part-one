import React from 'react'
import classes from './category.module.css'
import { Link } from 'react-router-dom'

function CategoryCard ({data}) {
    // console.log(data) x16 {title: 'Jewelery' , name: "jewelery", imgLink:  'https://m.media-amazon.com/images/W/MEDIAX_849526-T2/images/I/71KkkTVEAqL._AC_UL320_.jpg'}
  return (
    <div className={classes.category}>
      <Link to={`/category/${data.name}`}>
        <span>
            <h2>{data?.title}</h2>
        </span>
        <img src={data?.imgLink} alt="" />
        <p>Shop now</p>
      </Link>
    </div>
  )
}

export default CategoryCard
