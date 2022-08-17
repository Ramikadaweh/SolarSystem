import * as React from "react";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

export default function OutlinedCard() {
  const [msg, setMsg] = useState([]);
  const [alert, setAlert] = useState(false);

  setTimeout(() => {
    setAlert(false);
  }, 10000);

  const getMsgs = () => {
    axios
      .get("http://localhost:3000/contacts/")
      .then((response) => {
        setMsg(response.data.response);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getMsgs();
  }, []);

  const deleteMsg = (_id) => {
    axios
      .delete(`http://localhost:3000/contacts/${_id}`)
      .then((res) => {
        getMsgs();
        setAlert(true)
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
          <h3 style={{ textAlign: "start" }}>Your Messages:</h3>
          <Box
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <React.Fragment>
              {msg.map((item, index) => {
                return (
                  <CardContent
                    key={index}
                    style={{
                      border: "solid 1px black",
                      borderRadius: "8px",
                      margin: "1%",
                      width: "295px",
                    }}
                  >
                    <div style={{ borderBottom: "1px solid" }}>
                      <Typography variant="h5" component="div">
                        {item.name}
                      </Typography>
                      <Typography style={{ fontSize: 14 }} color="black">
                        {item.email}
                      </Typography>
                    </div>
                    <div style={{ overflow: "auto" }}>
                      <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {item.subject}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "gray" }}>
                        {item.message}
                      </Typography>
                    </div>
                    <Button size="small" onClick={() => deleteMsg(item._id)}>
                      Delete
                    </Button>
                  </CardContent>
                );
              })}
            </React.Fragment>
          </Box>
          {alert ? (
              <Stack
                className="alert"
                spacing={2}
              >
                <Alert variant="filled" severity="success">
                  successfully deleted
                </Alert>
              </Stack>
            ) :
              <></>
            }
    </div>
  );
}
