import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import NavBar from "../components/navBar";
import AccountCircle from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import SubjectIcon from "@mui/icons-material/Subject";
import StickyNote2OutlinedIcon from "@mui/icons-material/StickyNote2Outlined";
import SendIcon from "@mui/icons-material/Send";
import LoadingButton from "@mui/lab/LoadingButton";
import contactt from "../images/contact.jpg";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

import "./contactus.css";
import axios from "axios";
export default function ContactUs() {
  const [loading, setLoading] = useState(false);
  const [contact, setContact] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [alert, setAlert] = useState(false);
  setTimeout(() => {
    setAlert(false);
  }, 8000);

  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  function ContactUS(e) {
    setLoading(true);
    e.preventDefault();

    axios
      .post("http://localhost:3000/contacts/ ", contact)
      .then((Response) => {
        setContact({});
        setAlert(true);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <div>
      <div className="nv">
        <NavBar />
      </div>
      <div className="contact">
        <div>
          <img src={contactt} alt="" />
        </div>
        <div className="second">
          <h1>Contact Us</h1>
          <form>
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
                className="t"
                id="input-with-sx"
                name="name"
                label="Name"
                value={contact.name || ""}
                variant="standard"
                onChange={handleChange}
              />
            </Box>
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <EmailIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
                type="email"
                className="t"
                id="input-with-sx"
                name="email"
                label="Email"
                value={contact.email || ""}
                variant="standard"
                onChange={handleChange}
              />
            </Box>
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <SubjectIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
                className="t"
                id="input-with-sx"
                value={contact.subject || ""}
                name="subject"
                label="Subject"
                variant="standard"
                onChange={handleChange}
              />
            </Box>
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <StickyNote2OutlinedIcon
                sx={{ color: "action.active", mr: 1, my: 0.5 }}
              />
              <TextField
                className="t"
                id="input-with-sx"
                name="message"
                value={contact.message || ""}
                label="message"
                multiline
                rows={4}
                variant="filled"
                onChange={handleChange}
              />
            </Box>
            <LoadingButton
              style={{ width: "70%", margin: "auto" }}
              endIcon={<SendIcon />}
              loading={loading}
              loadingPosition="end"
              variant="contained"
              onClick={ContactUS}
            >
              Send
            </LoadingButton>
            {alert ? (
              <Stack
                sx={{
                  width: "70%",
                  position: "absolute",
                  top: "18%",
                  transition: "1s",
                }}
                spacing={2}
              >
                <Alert variant="filled" severity="success">
                  Message sent successfully
                </Alert>
              </Stack>
            ) : (
              <></>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
