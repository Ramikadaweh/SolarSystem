import React from "react";
import "./Search.css";
import { useEffect, useState } from "react";
import axios from "axios";
function SearchPack(props) {
  const [amp, setAmp] = useState("");
  const {data, handledSearch, handledSort} = props
  const getAMP = () => {
    axios
      .get("http://localhost:3000/amperes/")
      .then((response) => {
        setAmp(response.data.response);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAMP();
  }, []);

  const onSortChange = (e) => {
    
    let sort = e.target.value;
    console.log(sort)
    let filteredPackages = data.filter((p) => p.amperes.name === sort)
    console.log("data:", data)
    console.log("filteredPackages:",filteredPackages)
    handledSort(filteredPackages)

    // if (sort === "5AMP") {
    //   props.data.amperes.name.sort("5AMP");
    //   return 1;
    // }
    // if (sort === "10AMP") {
    //     props.data.amperes.name.sort("10AMP");
    //   return 1;
    // }
    // props.handledSort(props.data);
  };

  const handleSearch = (e) => {
    handledSearch(e.target.value);
  };

  return (
    <div className="search_section">
      <div className="filter_div">
        <p>Choose your package :</p>
        <select className="filtration" onChange={onSortChange}>
          {amp &&
            amp.map((item, index) => {
              return (
                <option key={index} value={item.name}>
                  {item.name}
                </option>
              );
            })}
        </select>
      </div>

      <div className="search_employee">
        <input type="search" placeholder="Search" onChange={handleSearch} />
      </div>
    </div>
  );
}

export default SearchPack;
