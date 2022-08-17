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

export default function Inverters() {
  const [image, setImage] = useState(null);
  const [Inverters, setInverters] = useState([]);
  const [newInverter, setNewInverter] = useState({
    name: "",
    size: "",
    price: "",
  });
  const [oneInverter, setOneInverter] = useState("");
  const [open, setOpen] = useState(false);
  const [openadd, setOpenAdd] = useState(false);
  const [search, setSearch] = useState("");

  const [alert, setAlert] = useState(false);
  const [alertadd, setAlertadd] = useState(false);

  setTimeout(() => {
    setAlert(false);
    setAlertadd(false);
  }, 10000);

  const handleClickOpen = (Inverters) => {
    setOneInverter(Inverters);
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
    console.log(e.target.files[0]);
  };

  const getInverters = () => {
    axios
      .get("http://localhost:3000/inverters/")
      .then((response) => {
        setInverters(response.data.response);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getInverters();
  }, []);

  const deleteInverter = (_id) => {
    axios
      .delete(`http://localhost:3000/inverters/${_id}`)
      .then((res) => {
        getInverters();
        setAlert(true);
      })
      .catch((err) => console.log(err));
  };

  const handleNewUserFields = (e) => {
    setNewInverter({ ...newInverter, [e.target.name]: e.target.value });
  };

  const addInverter = async (e) => {
    e.preventDefault();
    const InverterData = new FormData();
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

        InverterData.append("name", newInverter.name);
        InverterData.append("size", newInverter.size);
        InverterData.append("price", newInverter.price);
        InverterData.append("image", picId);

        InverterData.forEach((value, key) => (formDataObj[key] = value));
      })
      .then(() => {
        axios
          .post("http://localhost:3000/inverters/", formDataObj, config)
          .then((Response) => {
            setInverters([...Inverters, Response.data.response]);
            setNewInverter({});
            setOpenAdd(false);
            setAlertadd(true);
          })
          .catch((error) => {
            console.log(error);
          });
      });
  };

  const handleChange = (e) => {
    setOneInverter({ ...oneInverter, [e.target.id]: e.target.value });
  };

  const editInverter = (_id) => {
    axios
      .put(`http://localhost:3000/inverters/${_id}`, oneInverter)
      .then((Response) => {
        getInverters();
      })
      .catch((error) => {
        console.log(error);
      });
    setOpen(false);
  };

  const filteredData = Inverters.filter((el) => {
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
            placeholder="Search for inverter"
            onChange={handledSearch}
          />
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
      </div>
      <Dialog open={openadd} onClose={handleClose}>
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
                value={newInverter.name || ""}
                onChange={handleNewUserFields}
              />
              <TextField
                id="standard-basic"
                label="size"
                variant="filled"
                name="size"
                value={newInverter.size || ""}
                onChange={handleNewUserFields}
              />
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
                value={newInverter.price || ""}
                onChange={handleNewUserFields}
              />
            </div>
            <Button variant="contained" component="label">
              Upload Image
              <input
                hidden
                accept="image/*"
                multiple
                type="file"
                name="image"
                onChange={uploadImage}
              />
            </Button>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>cancel</Button>
          <Button onClick={addInverter}>Add</Button>
        </DialogActions>
      </Dialog>
      <TableContainer
        component={Paper}
        sx={{ width: "50vw", margin: "auto", marginTop: "3%" }}
      >
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">Name</StyledTableCell>
              <StyledTableCell align="left">size</StyledTableCell>
              <StyledTableCell align="right">Price</StyledTableCell>
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
                <StyledTableCell align="left">{item.size}</StyledTableCell>
                <StyledTableCell align="right">{item.price}$</StyledTableCell>
                {console.log(item.image.name)}
                <img
                  src={`http://localhost:3000/upload/images/${item.image.name}`}
                  alt=""
                  style={{ width: "20%" }}
                />
                <StyledTableCell align="right">
                  <ModeEditOutlinedIcon
                    style={{
                      marginTop: "15%",
                      marginLeft: "25%",
                      fontSize: "30px",
                      cursor: "pointer",
                    }}
                    onClick={() => handleClickOpen(item)}
                  />
                </StyledTableCell>
                <StyledTableCell align="right">
                  <DeleteOutlinedIcon
                    style={{
                      fontSize: "30px",
                      marginRight: "5px",
                      cursor: "pointer",
                    }}
                    onClick={() => deleteInverter(item._id)}
                  />
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
                    value={oneInverter.name}
                    onChange={handleChange}
                  />
                  <TextField
                    id="size"
                    label="size"
                    variant="filled"
                    name="size"
                    value={oneInverter.size}
                    onChange={handleChange}
                  />
                </div>
                <div style={{ display: "flex", gap: "1%" }}>
                  <TextField
                    id="price"
                    label="price"
                    variant="filled"
                    name="price"
                    value={oneInverter.price}
                    onChange={handleChange}
                  />
                </div>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>cancel</Button>
                <Button
                  onClick={() => editInverter(oneInverter._id)}
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
        <Stack className="alert" spacing={2}>
          <Alert variant="filled" severity="success">
            successfully deleted
          </Alert>
        </Stack>
      ) : alertadd ? (
        <Stack className="alert" spacing={2}>
          <Alert variant="filled" severity="success">
            successfully added
          </Alert>
        </Stack>
      ) : (
        <></>
      )}
    </div>
  );
}
