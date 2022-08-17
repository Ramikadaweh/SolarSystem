import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../components/navBar";
import "./battery.css";
import Search from "../components/Search";
import ActionAreaCard from "../components/inverCard";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Footer from "../components/footer";

export default function Inverter() {
  const [inverters, setInverters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const getInverters = () => {
    setLoading(true);
    axios
      .get("http://localhost:3000/inverters/")
      .then((response) => {
        setInverters(response.data.response);
        console.log(response.data.response);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getInverters();
  }, []);

  const filteredData = inverters.filter((el) => {
    //if no input the return the original
    if (search === "") {
      return el;
    }
    //returns the item which contains the user input
    else {
      return el.name.toLowerCase().includes(search);
    }
  });
  const handleSearch = (data) => {
    setSearch(data.toLowerCase());
  };
  const handledSort = (sortedData) => {
    setInverters([...sortedData]);
  };

  return (
    <div>
      <div className="nv">
        <NavBar />
      </div>
      <Search
        data={inverters}
        handleSearch={handleSearch}
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
