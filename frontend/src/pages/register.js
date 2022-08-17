import React, { useState } from "react";
import registerSolar from "../images/registerSolar.png";
import "./register.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import CallIcon from "@mui/icons-material/Call";
import HomeIcon from "@mui/icons-material/Home";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import axios from "axios";


export default function Register() {

  const [username,setUser] = useState("");
  const [email,setMail] = useState("");
  const [password,setPass] = useState("");
  const [tel,setTel] = useState("");
  const [address,setAddr] = useState("");

  function onAddAdmin(e) {
    e.preventDefault();
    const addAdmin = {
      username,
      email,
      password,
      tel,
      address
    };
    axios
      .post('http://localhost:3000/users/', addAdmin)
      .then((Response) => {
        console.log(Response);
      })
      .catch((error) => {
        console.log(error);
      });
    document.getElementById("register_form").reset();
  }

  return (
    <div className="register">
      <div>
        <form id="register_form" >
          <p className="psign">Sign up</p>
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              id="input-with-sx"
              label="Username"
              variant="standard"
              onChange={(e) => setUser(e.target.value)}
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <EmailIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              id="input-with-sx"
              label="Email"
              variant="standard"
              onChange={(e) => setMail(e.target.value)}
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <LockIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              id="input-with-sx"
              label="Password"
              variant="standard"
              onChange={(e) => setPass(e.target.value)}
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <CallIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              id="input-with-sx"
              label="Telephone"
              variant="standard"
              onChange={(e) => setTel(e.target.value)}
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <HomeIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              id="input-with-sx"
              label="Address"
              variant="standard"
              onChange={(e) => setAddr(e.target.value)}
            />
          </Box>
          <p>
            Already have an account ?<Link to="/login"> login</Link>
          </p>
          <Button variant="contained" onClick={onAddAdmin}>Register</Button>
        </form>
      </div>
      <div>
        <img className="regimg" src={registerSolar} alt=""></img>
      </div>
    </div>
  );
}
