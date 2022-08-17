import React from "react";
import "./Search.css";

function Search(props) {
  const onSortChange = (e) => {
    let sort = e.target.value;

    if (sort === "name") {
      props.data.sort((a, b) => {
        if (a.name > b.name) {
          return 1;
        }
        if (b.name > a.name) {
          return -1;
        }
        return 0;
      });
    }
    if (sort === "price") {
      props.data.sort((a, b) => {
        return a.price - b.price;
      });
    }
    props.handledSort(props.data);
  };

  const handleSearch = (e) => {
    props.handleSearch(e.target.value);
  };

  return (
    <div className="search_section">
      <div className="filter_div">
        <p>Sort by :</p>
        <select className="filtration" onChange={onSortChange}>
          <option value="name">Name</option>
          <option value="price">Price</option>
        </select>
      </div>

      <div className="search_employee">
        <input type="search" placeholder="Search" onChange={handleSearch} />
      </div>
    </div>
  );
}

export default Search;
