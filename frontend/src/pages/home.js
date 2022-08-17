import React from "react";
import "./home.css";
import putPanel from "../images/putpanel.jpeg";
import inverter5 from "../images/ourinverter5.jpeg";
import base from "../images/ourbase.jpeg";
import table from "../images/ourtable.jpeg";
import inverter from "../images/ourinverter.jpeg";
import inverter3 from "../images/ourinverter3.jpeg";
import waw from "../images/waw.jpeg";
import trees from "../images/trees2_adobe_express.svg";
import sunpower from "../images/sunpower.svg";
import sunelec from "../images/sunelec3.svg";
import ali from "../images/alijaber.jpg";
import stephani from "../images/stephani.jpeg";
import NavBar from "../components/navBar";
import { Link } from "react-router-dom";
import Footer from "../components/footer";

export default function Home() {
  return (
    <div className="home">
      <section className="header">
        <NavBar />
        <div className="text-box">
          <h1>Solar Energy System Services</h1>
          <p>
            Solar energy is the most abundant of all energy resources and can
            even be harnessed in cloudy weather.The rate at which solar energy
            is intercepted
            <br /> by the Earth is about 10,000 times greater than the rate at
            which humankind consumes energy.
          </p>
          <Link to="/aboutus" className="hero-btn">
            Visit Us To Know More
          </Link>
        </div>
      </section>

      <section className="services">
        <h1>Services We Offre</h1>
        <p>We can offre for you several kind of services like:</p>

        <div className="row">
          <div className="service-col">
            <h3>Solar Panels Installation</h3>
            <p>
              With most sunlight conversion efficiency.
              <br />A solar cell panel, solar electric panel, photo-voltaic
              module or solar panel is an assembly of photo-voltaic cells
              mounted in a framework for installation. Solar panels use sunlight
              as a source of energy to generate direct current electricity.
            </p>
          </div>
          <div className="service-col">
            <h3>The Preventative Maintenance</h3>
            <p>
              Inspection to prevent emergency repair.
              <br />
              Preventive maintenance is the act of performing regularly
              scheduled maintenance activities to help prevent unexpected
              failures in the future. Put simply, it's about fixing things
              before they break.
            </p>
          </div>
          <div className="service-col">
            <h3>Upgrade Or Replacement</h3>
            <p>
              Get your panels in good shape regularly.
              <br />
              Upgrading is the process of replacing a product with a newer
              version of the same product. In computing and consumer electronics
              an upgrade is generally a replacement of hardware, software or
              firmware with a newer or better version, in order to bring the
              system up to date or to improve its characteristics.
            </p>
          </div>
        </div>
      </section>

      <section className="products">
        <h1>Some of our Work</h1>
        <p>For Controling Your Energy Production</p>
        <div class="wrapper">
          <img src={putPanel} alt="" />
          <img src={inverter} alt="" />
          <img src={inverter3} alt="" />
          <img src={inverter5} alt="" />
          <img src={base} alt="" />
          <img src={table} alt="" />
          <img src={waw} alt="" />
        </div>
      </section>

      <section className="saveEnergie">
        <div>
          <img src={sunelec} alt="" />
          <p>
            Save Energy
            <br />
            For World
          </p>
        </div>
        <div>
          <img src={sunpower} alt="" />
          <p>
            Residentials
            <br />
            Solutions
          </p>
        </div>
        <div>
          <img src={trees} alt="" />
          <p>
            Get Energy
            <br />
            Forests
          </p>
        </div>
      </section>

      <section className="comments">
        <h1>What Our Customers Say</h1>
        <p>Here is some of cutomers comments about our work</p>

        <div className="row">
          <div className="comments-col">
            <img src={ali} alt="" />
            <div>
              <p>
                Perfect solar system installation with proffesional work
                <br />
                There is a full focus during the work in addition a great team
                work
              </p>
              <h3>Ali Jaber</h3>
            </div>
          </div>

          <div className="comments-col">
            <img src={stephani} alt="" />
            <div>
              <p>
                Perfect solar system installation with proffesional work
                <br />
                There is a full focus during the work in addition a great team
                work
              </p>
              <h3>Stephanie Saliba</h3>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-us">
        <h1>
          Don't Hesitate To Contact Us
          <br />
          Anywhere From The World
        </h1>
        <Link to="/contactUs" className="hero-btn">
          Contact Us
        </Link>
      </section>

      <section className="about-us">
        <h2>About US</h2>
        <p>
          Use Natural Resources Integrated Services And Solutions For Industry
          <br />
          Our company is an end-to-end, customer oriented alternative energy
          company that is centered on the marketing, trading, transportation,
          <br />
          and distribution of solar panels in the US and around the world…
        </p>
        <div className="icons">
          <i className="fa fa-facebbok"></i>
          <i className="fa fa-twitter"></i>
          <i className="fa fa-instagram"></i>
          <i className="fa fa-linkedin"></i>
        </div>
      </section>

      <Footer/>
    </div>
  );
}
