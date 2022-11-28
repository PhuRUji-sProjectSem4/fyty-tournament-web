import React from 'react'

import "./css/SearchBar.css"

const SearchBar = (props) => {
  return (
    <div  className='searchBar'>
        <input type="text" placeholder={props.placeholder} />
        <img src="/asset/search.svg" alt="searchIcon" height="25px" width="25px" />
    </div>
  )
}

export default SearchBar