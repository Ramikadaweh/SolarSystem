import React, { useState } from "react";
import loginSolar from "../images/logSolar.jpg";
import "./login.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import Button from "@mui/material/Button";
import axios from "axios";
import { Link,useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setMail] = useState("");
  const [password, setPass] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();


  function onLogin(e) {
    e.preventDefault();
    const login = {
      email,
      password,
    };
    axios
      .post("http://localhost:3000/users/admin", login)
      .then((Response) => {
        console.log(Response);
        setMessage(Response.data);
        if (Response.data !== "invalid email or password") {
          localStorage.setItem('token', Response.data);
          navigate('/dashboard')
        }
      })
      .catch((error) => {
        console.log(error);
      });
    // document.getElementById("login_form").reset();
  }

  return (
    <div className="login">
      <div>
        <img className="logimg" src={loginSolar} alt=""></img>
      </div>
      <form className="formLog" id="login_form">
        <h1 style={{ color: "#9AB5BC" }}>Good to see you again</h1>
        <p>
          Don't have an account ?<Link to="/register"> register</Link>
        </p>
        <p className="psign">Log in</p>
        <h4 style={{ color: "red", width: "300px", textAlign: "center" }}>
          {message}
        </h4>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
          }}
        >
          <EmailIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
          <TextField
            id="input-with-sl"
            label="Email"
            variant="standard"
            onChange={(e) => setMail(e.target.value)}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
          }}
        >
          <LockIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
          <TextField
            id="input-with-sl"
            label="Password"
            variant="standard"
            onChange={(e) => setPass(e.target.value)}
          />
        </Box>
        <Button className="btnlogin" variant="contained" onClick={onLogin}>
          Login
        </Button>
      </form>
    </div>
  );
}
