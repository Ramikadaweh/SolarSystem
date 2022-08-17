import * as React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import "./alert.css"

export default function Batteries() {
  const [image, setImage] = useState(null);
  const [batteries, setBatteries] = useState([]);
  const [newBattery, setNewBattery] = useState({
    name: "",
    capacity: "",
    price: "",
    type: "",
  });
  const [oneBattery, setOneBattery] = useState("");
  const [open, setOpen] = useState(false);
  const [openadd, setOpenAdd] = useState(false);
  const [search, setSearch] = useState("");
  const [alert, setAlert] = useState(false);
  const [alertadd, setAlertadd] = useState(false);

  setTimeout(() => {
    setAlert(false);
    setAlertadd(false)
  }, 10000);

  const handleClickOpen = (batteries) => {
    setOneBattery(batteries);
    setOpen(true);
  };

  const handleClickOpenAdd = () => {
    setOpenAdd(true);
  };
  const handleClose = () => {
    setOpen(false);
    setOpenAdd(false);
  };

  let picId = null;

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const uploadImage = (e) => {
    setImage(e.target.files[0]);
  };

  const getBatteries = () => {
    axios
      .get("http://localhost:3000/batteries/")
      .then((response) => {
        setBatteries(response.data.response);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getBatteries();
  }, []);

  const deleteBattery = (_id) => {
    axios
      .delete(`http://localhost:3000/batteries/${_id}`)
      .then((res) => {
        getBatteries();
        setAlert(true)
      })
      .catch((err) => console.log(err));
  };

  const handleNewUserFields = (e) => {
    setNewBattery({ ...newBattery, [e.target.name]: e.target.value });
  };

  const addBattery = async (e) => {
    e.preventDefault();
    const batteryData = new FormData();
    const formDataObj = {};
    const config = {
      Headers: {
        "content-type": "multipart/form-data",
      },
    };
    const data = new FormData();
    data.append("image", image);
    axios
      .post("http://localhost:3000/upload/", data)
      .then((res) => {
        picId = res.data.response._id;

        batteryData.append("name", newBattery.name);
        batteryData.append("capacity", newBattery.capacity);
        batteryData.append("price", newBattery.price);
        batteryData.append("type", newBattery.type);
        batteryData.append("image", picId);

        batteryData.forEach((value, key) => (formDataObj[key] = value));
      })
      .then(() => {
        axios
          .post("http://localhost:3000/batteries/", formDataObj, config)
          .then((Response) => {
            setBatteries([...batteries, Response.data.response]);
            setNewBattery({});
            setOpenAdd(false)
            setAlertadd(true)
          })
          .catch((error) => {
            console.log(error);
          });
      });
  };

  const handleChange = (e) => {
    setOneBattery({ ...oneBattery, [e.target.id]: e.target.value });
  };

  const editbattery = (_id) => {
    axios
      .put(`http://localhost:3000/batteries/${_id}`, oneBattery)
      .then((Response) => {
        getBatteries();
      })
      .catch((error) => {
        console.log(error);
      });
    setOpen(false);
  };

  const filteredData = batteries.filter((el) => {
    if (search === "") {
      return el;
    } else {
      return el.name.toLowerCase().includes(search);
    }
  });
  const handleSearch = (data) => {
    setSearch(data.toLowerCase());
  };
  const handledSearch = (e) => {
    handleSearch(e.target.value);
  };

  return (
    <div>
       <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "10%",
              flexWrap: "wrap",
            }}
          >
            <Paper
              component="form"
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: 400,
              }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search for battery"
                onChange={handledSearch} />
              <IconButton sx={{ p: "10px" }}>
                <SearchIcon />
              </IconButton>
            </Paper>
            <Button
              variant="contained"
              onClick={handleClickOpenAdd}
              style={{ marginTop: "1%" }}
            >
              Add Package
            </Button>
          </div><Dialog open={openadd} onClose={handleClose}>
              <DialogContent>
                <form
                  encType="multipart/form-data"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "8px",
                    flexWrap: "wrap",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: "8px",
                      flexWrap: "wrap",
                      justifyContent: "center",
                    }}
                  >
                    <TextField
                      id="standard-basic"
                      label="name"
                      variant="filled"
                      name="name"
                      value={newBattery.name || ""}
                      onChange={handleNewUserFields} />
                    <TextField
                      id="standard-basic"
                      label="capacity"
                      variant="filled"
                      name="capacity"
                      value={newBattery.capacity || ""}
                      onChange={handleNewUserFields} />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: "8px",
                      flexWrap: "wrap",
                      justifyContent: "center",
                    }}
                  >
                    <TextField
                      id="standard-basic"
                      label="price"
                      variant="filled"
                      name="price"
                      value={newBattery.price || ""}
                      onChange={handleNewUserFields} />
                    <TextField
                      id="standard-basic"
                      label="type"
                      variant="filled"
                      name="type"
                      value={newBattery.type || ""}
                      onChange={handleNewUserFields} />
                  </div>
                  <Button variant="contained" component="label">
                    Upload Image
                    <input
                      hidden
                      accept="image/*"
                      multiple
                      type="file"
                      name="image"
                      onChange={uploadImage} />
                  </Button>
                </form>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>cancel</Button>
                <Button onClick={addBattery}>Add</Button>
              </DialogActions>
            </Dialog><TableContainer
              component={Paper}
              sx={{ width: "50vw", margin: "auto", marginTop: "3%" }}
            >
              <Table aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="left">Name</StyledTableCell>
                    <StyledTableCell align="left">Capacity</StyledTableCell>
                    <StyledTableCell align="right">Price</StyledTableCell>
                    <StyledTableCell align="right">Type</StyledTableCell>
                    <StyledTableCell align="center">Image</StyledTableCell>
                    <StyledTableCell align="right">Edit</StyledTableCell>
                    <StyledTableCell align="right">Delete</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredData.map((item, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell component="th" scope="row">
                        {item.name}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {item.capacity}AMP
                      </StyledTableCell>
                      <StyledTableCell align="right">{item.price}$</StyledTableCell>
                      <StyledTableCell align="right">{item.type}</StyledTableCell>
                      <img
                        src={`http://localhost:3000/upload/images/${item.image.name}`}
                        alt=""
                        style={{ width: "20%" }} />
                      <StyledTableCell align="right">
                        <ModeEditOutlinedIcon
                          style={{
                            marginTop: "15%",
                            marginLeft: "25%",
                            fontSize: "30px",
                            cursor: "pointer",
                          }}
                          onClick={() => handleClickOpen(item)} />
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <DeleteOutlinedIcon
                          style={{
                            fontSize: "30px",
                            marginRight: "5px",
                            cursor: "pointer",
                          }}
                          onClick={() => deleteBattery(item._id)} />
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                  <Dialog open={open} onClose={handleClose}>
                    <DialogContent
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "5px",
                        width: "100%",
                      }}
                    >
                      <div style={{ display: "flex", gap: "1%" }}>
                        <TextField
                          id="name"
                          label="name"
                          variant="filled"
                          name="name"
                          value={oneBattery.name}
                          onChange={handleChange} />
                        <TextField
                          id="capacity"
                          label="capacity"
                          variant="filled"
                          name="capacity"
                          value={oneBattery.capacity}
                          onChange={handleChange} />
                      </div>
                      <div style={{ display: "flex", gap: "1%" }}>
                        <TextField
                          id="price"
                          label="price"
                          variant="filled"
                          name="price"
                          value={oneBattery.price}
                          onChange={handleChange} />
                        <TextField
                          id="type"
                          label="type"
                          variant="filled"
                          name="type"
                          value={oneBattery.type}
                          onChange={handleChange} />
                      </div>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose}>cancel</Button>
                      <Button
                        onClick={() => editbattery(oneBattery._id)}
                        name="savebtn"
                      >
                        save
                      </Button>
                    </DialogActions>
                  </Dialog>
                </TableBody>
              </Table>
            </TableContainer>
            {alert ? (
              <Stack
                className="alert"
                spacing={2}
              >
                <Alert variant="filled" severity="success">
                  successfully deleted
                </Alert>
              </Stack>
            ) : alertadd ? (
              <Stack
                className="alert"
                spacing={2}
              >
                <Alert variant="filled" severity="success">
                  successfully added
                </Alert>
              </Stack>
            ) :
              <></>
            }
    </div>
  );
}
