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
import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function Users() {
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

  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({});
  const [oneUser, setOneUser] = useState("");
  const [open, setOpen] = useState(false);
  const [openadd, setOpenAdd] = useState(false);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false)

  const handleClickOpen = (users) => {
    setOneUser(users);
    setOpen(true);
  };

  const handleClickOpenAdd = () => {
    setOpenAdd(true);
  };
  const handleClose = () => {
    setOpen(false);
    setOpenAdd(false);
  };

  const getUsers = () => {
    setLoading(true)
    axios
      .get("http://localhost:3000/users/")
      .then((response) => {
        setUsers(response.data);
        setLoading(false)
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleNewUserFields = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  function addUser(e) {
    e.preventDefault();

    axios
      .post("http://localhost:3000/users/ ", newUser)
      .then((Response) => {
        setUsers([...users, Response.data]);
        setNewUser({});
        setOpenAdd(false)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const deleteUser = (_id) => {
    axios
      .delete(`http://localhost:3000/users/${_id}`)
      .then((res) => {
        getUsers();
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    setOneUser({ ...oneUser, [e.target.id]: e.target.value });
  };

  const editUser = (_id) => {
    axios
      .put(`http://localhost:3000/users/${_id}`, oneUser)
      .then((Response) => {
        getUsers();
      })
      .catch((error) => {
        console.log(error);
      });
    setOpen(false);
  };

  const filteredData = users.filter((el) => {
    if (search === "") {
      return el;
    } else {
      return el.username.toLowerCase().includes(search);
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
      {loading ? (
        <Box
          sx={{ display: "flex", justifyContent: "center", marginTop: "5%" }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
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
                placeholder="Search for user"
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
                  justifyContent: "center",
                  gap: "8px",
                  flexWrap: "wrap",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  <TextField
                    id="standard-basic"
                    label="Username"
                    variant="filled"
                    name="username"
                    value={newUser.username || ""}
                    onChange={handleNewUserFields}
                  />
                  <TextField
                    id="standard-basic"
                    label="Email"
                    variant="filled"
                    name="email"
                    value={newUser.email || ""}
                    onChange={handleNewUserFields}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  <TextField
                    id="standard-basic"
                    label="Telephone"
                    variant="filled"
                    name="tel"
                    value={newUser.tel || ""}
                    onChange={handleNewUserFields}
                  />
                  <TextField
                    id="standard-basic"
                    label="address"
                    variant="filled"
                    name="address"
                    value={newUser.address || ""}
                    onChange={handleNewUserFields}
                  />
                </div>
                <TextField
                  id="standard-basic"
                  label="Password"
                  variant="filled"
                  name="password"
                  value={newUser.password || ""}
                  onChange={handleNewUserFields}
                />
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>cancel</Button>
              <Button onClick={addUser}>Add</Button>
            </DialogActions>
          </Dialog>
          <TableContainer
            component={Paper}
            sx={{ width: "60vw", margin: "auto", marginTop: "3%" }}
          >
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="left">Username</StyledTableCell>
                  <StyledTableCell align="left">Email</StyledTableCell>
                  <StyledTableCell align="right">password</StyledTableCell>
                  <StyledTableCell align="right">Telephone</StyledTableCell>
                  <StyledTableCell align="right">Address</StyledTableCell>
                  <StyledTableCell align="right">Edit</StyledTableCell>
                  <StyledTableCell align="right">Delete</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.map((item, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell component="th" scope="row">
                      {item.username}
                    </StyledTableCell>
                    <StyledTableCell align="left">{item.email}</StyledTableCell>
                    <StyledTableCell align="right">
                      {item.password}
                    </StyledTableCell>
                    <StyledTableCell align="right">{item.tel}</StyledTableCell>
                    <StyledTableCell align="right">
                      {item.address}
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
                        onClick={() => deleteUser(item._id)}
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
                        id="username"
                        label="username"
                        variant="filled"
                        name="userName"
                        value={oneUser.username}
                        onChange={handleChange}
                      />
                      <TextField
                        id="email"
                        label="email"
                        variant="filled"
                        name="userEmail"
                        value={oneUser.email}
                        onChange={handleChange}
                      />
                    </div>
                    <div style={{ display: "flex", gap: "1%" }}>
                      <TextField
                        id="password"
                        label="password"
                        variant="filled"
                        name="userPassword"
                        value={oneUser.password}
                        onChange={handleChange}
                      />
                      <TextField
                        id="address"
                        label="address"
                        variant="filled"
                        name="userAddress"
                        value={oneUser.address}
                        onChange={handleChange}
                      />
                    </div>
                    <TextField
                      id="tel"
                      label="telephone"
                      variant="filled"
                      name="userTel"
                      value={oneUser.tel}
                      onChange={handleChange}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>cancel</Button>
                    <Button
                      onClick={() => editUser(oneUser._id)}
                      name="savebtn"
                    >
                      save
                    </Button>
                  </DialogActions>
                </Dialog>
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </div>
  );
}
