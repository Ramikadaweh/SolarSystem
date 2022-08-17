import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../components/navBar";
import "./battery.css";
import ActionAreaCard from "../components/packCard";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import SearchPack from "../components/packSearch";
import Footer from "../components/footer";

export default function Package() {
  const [packages, setPackages] = useState([]);
  const [initialPackages, setInitialPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const getPackages = () => {
    setLoading(true);
    axios
      .get("http://localhost:3000/packages/")
      .then((response) => {
        setPackages(response.data.response);
        setInitialPackages(response.data.response);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getPackages();
  }, []);

  const filteredData = packages.filter((el) => {
    //if no input the return the original
    if (search === "") {
      return el;
    }
    //returns the item which contains the user input
    else {
      return el.amperes.name.toLowerCase().includes(search);
    }
  });
  const handleSearch = (data) => {
    setSearch(data.toLowerCase());
  };
  const handledSort = (sortedData) => {
    setPackages([...sortedData]);
  };

  return (
    <div>
      <div className="nv">
        <NavBar />
      </div>
      <SearchPack
        data={initialPackages}
        handledSearch={handleSearch}
        handledSort={handledSort}
      />
      {loading ? (
        <Box
          sx={{ display: "flex", justifyContent: "center", marginTop: "5%" }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          <div className="batcard">
            {filteredData.map((item, index) => {
              return (
                <div key={index} style={{ margin: "2%" }}>
                  <ActionAreaCard data={item} />
                </div>
              );
            })}
          </div>
          <Footer />
        </>
      )}
    </div>
  );
}
