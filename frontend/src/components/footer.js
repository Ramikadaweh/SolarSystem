import React from "react";

export default function Footer() {
  return (
    <div>
      <section className="footer">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "10%",
            borderBottom: "1px solid grey",
            flexWrap: "wrap",
            paddingBottom: "5%",
          }}
        >
          <div style={{ textAlign: "justify" }}>
            <h3 style={{ textAlign: "start" }}>Contact Us</h3>
            <p>
              Phone Number:
              <br />
              (961)71067677
            </p>
            <br />
            <p>
              Send Email:
              <br />
              ziadkadaweh50@gmail.com
            </p>
          </div>
          <div style={{ textAlign: "justify" }}>
            <h3 style={{ textAlign: "start" }}>Our Services</h3>
            <p>
              Installation & Monitoring
              <br />
              <br />
              After Sales Service
              <br />
              <br />
              Free Replacement
              <br />
              <br />
              Warrenty Claims
              <br /> <br />
              Energy Equipments
            </p>
          </div>
          <div style={{ textAlign: "justify" }}>
            <h3 style={{ textAlign: "start" }}>Products</h3>
            <p>
              Batteries(acide, lithium, gel)
              <br />
              <br />
              Panels(flexible, double & single face)
              <br />
              <br />
              Inverters(different size)
              <br />
              <br />
              Controller
              <br /> <br />
              Accessories
            </p>
          </div>
          <div style={{ textAlign: "justify" }}>
            {/* <img src={logo} alt="" style={{ width: "150px", height: "65px" }} /> */}
            <h3 style={{ textAlign: "start" }}>Quick Navigation</h3>

            <p>
              About US
              <br />
              <br />
              Products
              <br />
              <br />
              Solutions
              <br />
              <br />
              News
              <br /> <br />
              SiteMap
            </p>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "45%",
            marginTop: "3%",
            marginBottom: "1%",
            flexWrap: "wrap",
          }}
        >
          <p style={{ marginLeft: "1%" }}>
            © Copyright 2022 By KadawehSolarSystem
          </p>
          <div style={{ display: "flex", gap: "0.5%" }}>
            <p
              style={{
                width: "120px",
                height: "25px",
                borderRight: "1px solid grey",
              }}
            >
              Privacy Policy
            </p>
            <p
              style={{
                width: "75px",
                height: "25px",
                borderRight: "1px solid grey",
              }}
            >
              SiteMap
            </p>
            <p style={{ width: "160px" }}>Terms & Conditions</p>
          </div>
        </div>
      </section>
    </div>
  );
}
