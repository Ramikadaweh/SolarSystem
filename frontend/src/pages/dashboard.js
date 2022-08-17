import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import Battery0BarIcon from "@mui/icons-material/Battery0Bar";
import SolarPowerOutlinedIcon from "@mui/icons-material/SolarPowerOutlined";
import AppSettingsAltOutlinedIcon from "@mui/icons-material/AppSettingsAltOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import VpnKeyOutlinedIcon from "@mui/icons-material/VpnKeyOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LogoutIcon from "@mui/icons-material/Logout";
import { Outlet, useNavigate } from "react-router-dom";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();

  const handleNavigation = (path) => {
    const slug = path.toLowerCase();
    navigate(`/dashboard/${slug}`);
  };

  const handleNavigationOut = (path) => {
    const slug = path.toLowerCase();
    navigate(`/${slug}`);
  };

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        style={{ backgroundColor: "rgb(92, 73, 130)" }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Welcome Admin
          </Typography>
        </Toolbar>
        <LogoutIcon
          style={{
            position: "absolute",
            right: "10px",
            top: "10px",
            width: "50px",
            height: "35px",
            cursor: "pointer",
          }}
          onClick={logout}
        />
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {[
            "Inbox",
            "Users",
            "Batteries",
            "Panels",
            "Inverters",
            "Packages",
          ].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton onClick={() => handleNavigation(text)}>
                <ListItemIcon>
                  {index === 0 ? (
                    <InboxIcon />
                  ) : index === 1 ? (
                    <PersonOutlineOutlinedIcon />
                  ) : index === 2 ? (
                    <Battery0BarIcon />
                  ) : index === 3 ? (
                    <SolarPowerOutlinedIcon />
                  ) : index === 4 ? (
                    <AppSettingsAltOutlinedIcon />
                  ) : (
                    <Inventory2OutlinedIcon />
                  )}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {["Home","Register", "Login"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton onClick={() => handleNavigationOut(text)}>
                <ListItemIcon>
                  {index === 0 ? (
                    <HomeOutlinedIcon />
                  ) :
                  index === 1 ? (
                    <LockOpenOutlinedIcon />
                  ) : (
                    <VpnKeyOutlinedIcon />
                  )}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={open} style={{ backgroundColor: "rgb(248, 241, 241)" }}>
        <DrawerHeader />
        <Outlet />
      </Main>
    </Box>
  );
}
