import React from "react";
import NavBar from "../components/navBar";
import about from "../images/aboutus.webp";
import "./aboutus.css"
export default function AboutUs() {
  return (
    <div>
      <div className="nv">
        <NavBar />
      </div>
      <div className="about">
        <div className="first">
          <h1 style={{ textAlign: "center", marginTop: "5%" }}>Who We Are</h1>
          <p style={{ marginTop: "5%" }}>
            {" "}
            Our company is an end-to-end, customer oriented alternative energy
            company centered on the marketing, trading, transportation.
            <br />
            And distribution of solar panels in Lebanon and around the world.
          </p>
          <h2 style={{ textAlign: "center", marginTop: "7%" }}>
            We're Different Than The Rest
          </h2>
          <p style={{ marginTop: "3%" }}>
            - We use Natural Resources Integrated Services And Solutions For
            Industry.
            <br />
            - All of our products with warranty of minimum five years.
            <br />- We pledge to our customers doing all kind of maintenance and
            replacements for free.
            <br />- We provide physical security and high-end technology
            solutions and services.
          </p>
        </div>
        <div >
          <img
            src={about}
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
