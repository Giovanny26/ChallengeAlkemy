import React, { useState } from "react";
import productService from "../../Service/productService"
import "./search.css"


export default function Search(props) {
  const [name, setName] = useState("");

  const ProductService = new productService();

  const postApi = () => {
        ProductService.search(name).then((response) => {
            if((response.status === 200) || (response.status === 201)){
                props.setAllProducts(response.data.results);
                setName("");
            } else {  

            }
        })
  };

  
  const onChange = e => setName(e.target.value);

  const onSubmit = e => {
    e.preventDefault();
    postApi();
  };

  return (
    <div className="searchContainer">
      <form onSubmit={onSubmit} className="searchForm">
        <input
          className="searchInput"
          type="text"
          name="query"
          onChange={onChange}
          value={name}
          autoComplete="off"
          placeholder="Search Food"
          required
        />
        <input className="searchButton" type="submit" value="Search" />
      </form>
    </div>
  );
}

