import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import Logout from "./auth/Logout";
import Protected from "./auth/Protected";
import Admin from "./admin/Admin";
import Home from "./Home";
import Navbar from "./Navbar";
import Dashboard from "./Dashboard";
import MyProperties from "./property/user/MyProperties";
import CreateProperty from "./property/CreateProperty";
import EditProperty from "./property/EditProperty";
import DetailedView from "./property/DetailedView";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <Protected>
                <Home />
              </Protected>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/logout" element={<Logout />} />
          <Route
            path="/dashboard"
            element={
              <Protected>
                <Dashboard />
              </Protected>
            }
          />
          <Route
            path="/details"
            element={
              <Protected>
                <DetailedView />
              </Protected>
            }
          />
          <Route
            path="/createProperty"
            element={
              <Protected>
                <CreateProperty />
              </Protected>
            }
          />
          <Route
            path="/editProperty"
            element={
              <Protected>
                <EditProperty />
              </Protected>
            }
          />
          <Route
            path="/myProperties"
            element={
              <Protected>
                <MyProperties />
              </Protected>
            }
          />
          <Route
            path="/admin"
            element={
              <Protected>
                <Admin />
              </Protected>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
