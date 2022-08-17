import * as React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

export default function Packages() {
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

  const [Packages, setPackages] = useState([]);
  const [newPackage, setNewPackage] = useState({
    name: "",
    price: "",
    amperes: "",
    batteries: { battery: "", bquantity: "" },
    panels: { panel: "", pquantity: "" },
    inverters: "",
  });
  const [onePackage, setOnePackage] = useState("");
  const [open, setOpen] = useState(false);
  const [openadd, setOpenAdd] = useState(false);
  const [search, setSearch] = useState("");
  const [batteriess, setBatteriess] = useState([]);
  const [panels, setPanels] = useState([]);
  const [inverters, setInverters] = useState([]);
  const [amperes, setAmperes] = useState([]);

  const [alert, setAlert] = useState(false);
  const [alertadd, setAlertadd] = useState(false);

  setTimeout(() => {
    setAlert(false);
    setAlertadd(false);
  }, 10000);

  let batterie = {};
  let panel = {};

  const handleClickOpen = (Packages) => {
    setOnePackage(Packages);
    console.log(Packages);
    setOpen(true);
  };

  const handleClickOpenAdd = () => {
    setOpenAdd(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenAdd(false);
  };

  const getPackages = () => {
    axios
      .get("http://localhost:3000/packages/")
      .then((response) => {
        setPackages(response.data.response);
      })
      .catch((err) => console.log(err));
  };

  const getBatteries = () => {
    axios
      .get("http://localhost:3000/batteries/")
      .then((response) => {
        setBatteriess(response.data.response);
      })
      .catch((err) => console.log(err));
  };

  const getPanels = () => {
    axios
      .get("http://localhost:3000/panels/")
      .then((response) => {
        setPanels(response.data.response);
      })
      .catch((err) => console.log(err));
  };

  const getIverters = () => {
    axios
      .get("http://localhost:3000/inverters/")
      .then((response) => {
        setInverters(response.data.response);
      })
      .catch((err) => console.log(err));
  };

  const getAmperes = () => {
    axios
      .get("http://localhost:3000/amperes/")
      .then((response) => {
        setAmperes(response.data.response);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getPackages();
    getBatteries();
    getPanels();
    getIverters();
    getAmperes();
  }, []);

  const handleNewPackageFields = (e) => {
    batterie = { battery: newPackage.battery, bquantity: newPackage.bquantity };
    panel = { panel: newPackage.panel, pquantity: newPackage.pquantity };

    newPackage.batteries = batterie;
    newPackage.panels = panel;
    setNewPackage({ ...newPackage, [e.target.name]: e.target.value });
  };

  function addPackage(e) {
    e.preventDefault();

    axios
      .post("http://localhost:3000/packages/ ", newPackage)
      .then((Response) => {
        setPackages([...Packages, Response.data.response]);
        setNewPackage({});
        setOpenAdd(false);
        setAlertadd(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const deletePackage = (_id) => {
    axios
      .delete(`http://localhost:3000/packages/${_id}`)
      .then((res) => {
        getPackages();
        setAlert(true);
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    // console.log("target:", e.target.id);
    let newObj;
    if (e.target.name === "battery") {
      let battery = batteriess.filter(
        (battery) => battery._id === e.target.value
      );
      // console.log("filtered battery:", battery);
      newObj = {
        ...onePackage,
        batteries: {
          ...onePackage.batteries,
          [e.target.name]: { ...battery[0] },
        },
      };

      // console.log("newObj:", newObj);
    } else if (e.target.name === "bquantity") {
      newObj = {
        ...onePackage,
        batteries: { ...onePackage.batteries, [e.target.id]: e.target.value },
      };
      // console.log("newObj:", newObj);
    } else if (e.target.name === "panel") {
      let panel = panels.filter((panel) => panel._id === e.target.value);
      console.log("filtered panel:", panel);
      newObj = {
        ...onePackage,
        panels: { ...onePackage.panels, [e.target.name]: { ...panel[0] } },
      };
    } else if (e.target.name === "pquantity") {
      newObj = {
        ...onePackage,
        panels: { ...onePackage.panels, [e.target.id]: e.target.value },
      };
    }else if (e.target.name === "inverters") {
      let inverter = inverters.filter((inverters) => inverters._id === e.target.value);
      // console.log("filtered inverters:", inverter);
      newObj = {
        ...onePackage,
          [e.target.name]: { ...inverter[0] } 
      };
    }else if (e.target.name === "amperes") {
      let ampere = amperes.filter((ampere) => ampere._id === e.target.value);
      // console.log("filtered ampere:", ampere);
      newObj = {
        ...onePackage,
          [e.target.name]: { ...ampere[0] } 
      };
    }
    setOnePackage({ ...newObj });

    // setOnePackage({ ...onePackage, [e.target.id]: e.target.value });
    // console.log(onePackage);
    console.log(e.target.id);
  };

  const editPackage = (_id) => {
    axios
      .put(`http://localhost:3000/packages/${_id}`, onePackage)
      .then((Response) => {
        getPackages();
      })
      .catch((error) => {
        console.log(error);
      });
    setOpen(false);
  };

  const filteredData = Packages.filter((el) => {
    if (search === "") {
      return el;
    } else {
      return el.amperes.name.toLowerCase().includes(search);
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
          gap: "15%",
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
            placeholder="Search by ampere"
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
          <div
            style={{
              display: "flex",
              gap: "8px",
              flexWrap: "wrap",
              justifyContent: "center",
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
                label="Name"
                variant="filled"
                name="name"
                value={newPackage.name || ""}
                onChange={handleNewPackageFields}
                style={{ width: "200px" }}
              />
              <TextField
                id="standard-basic"
                label="Price"
                variant="filled"
                name="price"
                value={newPackage.price || ""}
                onChange={handleNewPackageFields}
                style={{ width: "200px" }}
              />
            </div>
            <div
              style={{
                width: "80%",
                display: "flex",
                justifyContent: "center",
                gap: "2%",
                flexWrap: "wrap",
              }}
            >
              <Box>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Battery</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="battery"
                    name="battery"
                    value={newPackage.battery || ""}
                    label="Battery"
                    onChange={handleNewPackageFields}
                    style={{ width: "200px" }}
                  >
                    {batteriess.map((item, index) => {
                      return (
                        <MenuItem key={index} value={item._id}>
                          {item.name}({item.capacity}AMP)
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Box>
              <TextField
                type="number"
                id="bquantity"
                name="bquantity"
                min="1"
                max="10"
                label="battery qte"
                onChange={handleNewPackageFields}
                value={newPackage.bquantity || ""}
                style={{ width: "150px" }}
              ></TextField>
            </div>
            <div
              style={{
                width: "80%",
                display: "flex",
                justifyContent: "center",
                gap: "2%",
                flexWrap: "wrap",
              }}
            >
              <Box>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Panel</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="panel"
                    name="panel"
                    value={newPackage.panel || ""}
                    label="Panel"
                    onChange={handleNewPackageFields}
                    style={{ width: "200px" }}
                  >
                    {panels.map((item, index) => {
                      return (
                        <MenuItem key={index} value={item._id}>
                          {item.name}({item.size}w)
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Box>
              <TextField
                type="number"
                id="quantity"
                name="pquantity"
                min="1"
                max="10"
                label="panel qte"
                onChange={handleNewPackageFields}
                value={newPackage.pquantity || ""}
                style={{ width: "150px" }}
              ></TextField>
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              <Box sx={{ width: "200px", margin: "auto" }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Inverter
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="inverters"
                    value={newPackage.inverters || ""}
                    label="Inverter"
                    onChange={handleNewPackageFields}
                  >
                    {inverters.map((item, index) => {
                      return (
                        <MenuItem key={index} value={item._id}>
                          {item.name}({item.size})
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ width: "200px", margin: "auto" }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Ampere</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="amperes"
                    value={newPackage.amperes || ""}
                    label="Ampere"
                    onChange={handleNewPackageFields}
                  >
                    {amperes.map((item, index) => {
                      return (
                        <MenuItem key={index} value={item._id}>
                          {item.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Box>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>cancel</Button>
          <Button onClick={addPackage}>Add</Button>
        </DialogActions>
      </Dialog>
      <TableContainer
        component={Paper}
        sx={{ width: "55vw", margin: "auto", marginTop: "3%" }}
      >
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">Ampere</StyledTableCell>
              <StyledTableCell align="left">Price</StyledTableCell>
              <StyledTableCell align="right">Batteries</StyledTableCell>
              <StyledTableCell align="right">Battery Qte</StyledTableCell>
              <StyledTableCell align="right">Panels</StyledTableCell>
              <StyledTableCell align="right">Panel Qte</StyledTableCell>
              <StyledTableCell align="right">Inverters</StyledTableCell>
              <StyledTableCell align="right">Edit</StyledTableCell>
              <StyledTableCell align="right">Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((item, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {item.amperes.name}
                </StyledTableCell>
                <StyledTableCell align="left">{item.price}</StyledTableCell>
                <StyledTableCell align="right">
                  {item.batteries.battery.name}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {item.batteries.bquantity}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {item.panels.panel.name}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {item.panels.pquantity}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {item.inverters.name}
                </StyledTableCell>
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
                    onClick={() => deletePackage(item._id)}
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
                  width: "auto",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "1%",
                    justifyContent: "center",
                  }}
                >
                  <TextField
                    id="name"
                    label="name"
                    variant="filled"
                    name="name"
                    value={onePackage.name}
                    onChange={handleChange}
                  />
                  <TextField
                    id="price"
                    label="price"
                    variant="filled"
                    name="price"
                    value={onePackage.price}
                    onChange={handleChange}
                  />
                </div>
                <Box
                  style={{
                    display: "flex",
                    gap: "2%",
                    justifyContent: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <FormControl fullWidth style={{ width: "200px" }}>
                    <InputLabel id="demo-simple-select-label">
                      Battery
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="battery"
                      name="battery"
                      value={onePackage.batteries?.battery._id}
                      label="battery"
                      onChange={handleChange}
                    >
                      {batteriess.map((item, index) => {
                        return (
                          <MenuItem key={index} value={item._id}>
                            {item.name}({item.capacity}AMP)
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                  <TextField
                    type="number"
                    id="bquantity"
                    name="bquantity"
                    min="1"
                    max="10"
                    label="battery qte"
                    value={onePackage.batteries?.bquantity}
                    onChange={handleChange}
                    style={{ width: "30%" }}
                  ></TextField>
                </Box>
                <div
                  style={{
                    display: "flex",
                    gap: "2%",
                    justifyContent: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <Box>
                    <FormControl fullWidth style={{ width: "200px" }}>
                      <InputLabel id="demo-simple-select-label">
                        Panel
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="panel"
                        name="panel"
                        value={onePackage.panels?.panel._id}
                        label="Panel"
                        onChange={handleChange}
                      >
                        {panels.map((item, index) => {
                          return (
                            <MenuItem key={index} value={item._id}>
                              {item.name}({item.size}w)
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </Box>
                  <TextField
                    type="number"
                    id="pquantity"
                    name="pquantity"
                    min="1"
                    max="10"
                    label="panel qte"
                    onChange={handleChange}
                    value={onePackage.panels?.pquantity}
                    style={{ width: "30%" }}
                  ></TextField>
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: "8px",
                    justifyContent: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <Box sx={{ width: "200px" }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Inverter
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="inverters"
                        name="inverters"
                        value={onePackage.inverters?._id}
                        label="Inverter"
                        onChange={handleChange}
                      >
                        {inverters.map((item, index) => {
                          return (
                            <MenuItem key={index} value={item._id}>
                              {item.name}({item.size})
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </Box>
                  <Box sx={{ width: "200px" }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Ampere
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="amperes"
                        name="amperes"
                        value={onePackage.amperes?._id}
                        label="Ampere"
                        onChange={handleChange}
                      >
                        {amperes.map((item, index) => {
                          return (
                            <MenuItem key={index} value={item._id}>
                              {item.name}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </Box>
                </div>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>cancel</Button>
                <Button
                  onClick={() => editPackage(onePackage._id)}
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
