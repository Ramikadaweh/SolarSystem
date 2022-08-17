import "./App.css";
import Login from "./pages/login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/register";
import PersistentDrawerLeft from "./pages/dashboard";
import OutlinedCard from "./dashboards/msgs";
import Users from "./dashboards/users";
import Batteries from "./dashboards/batteries";
import Panels from "./dashboards/panels";
import Inverters from "./dashboards/inverters";
import Packages from "./dashboards/packages";
import Home from "./pages/home";
import Battery from "./pages/battery";
import Panel from "./pages/panel";
import Inverter from "./pages/inverter";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/notFound/notFound";
import AboutUs from "./pages/aboutus";
import ContactUs from "./pages/contactus";
import Package from "./pages/package";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/*" exact element={<NotFound />} />
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/home" element={<Home />}></Route>
          <Route exact path="/batteries" element={<Battery />}></Route>
          <Route exact path="/panels" element={<Panel />}></Route>
          <Route exact path="/inverters" element={<Inverter />}></Route>
          <Route exact path="/packages" element={<Package />}></Route>
          <Route exact path="/aboutus" element={<AboutUs />}></Route>
          <Route exact path="/contactus" element={<ContactUs />}></Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<PersistentDrawerLeft />}>
              <Route path="/dashboard/inbox" element={<OutlinedCard />} />
              <Route path="/dashboard/users" element={<Users />} />
              <Route path="/dashboard/batteries" element={<Batteries />} />
              <Route path="/dashboard/panels" element={<Panels />} />
              <Route path="/dashboard/inverters" element={<Inverters />} />
              <Route path="/dashboard/packages" element={<Packages />} />
            </Route>
            <Route exact path="/register" element={<Register />}></Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
