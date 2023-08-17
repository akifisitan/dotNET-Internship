import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar } from "../ui/Navbar";
import { Protected } from "../auth/Protected";
import { Login } from "./login/Login";
import { Signup } from "./signup/Signup";
import { Logout } from "./logout/Logout";
import { Admin } from "./admin/Admin";
import { Home } from "./home/Home";
import { Dashboard } from "./dashboard/Dashboard";
import { CreateProperty } from "./dashboard/user/CreateProperty";
import { EditProperty } from "./dashboard/user/EditProperty";
import { DetailedView } from "./details/DetailedView";
import { PropertyMap } from "./map/PropertyMap";

export const Pages = () => {
  return (
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
          path="/map"
          element={
            <Protected>
              <PropertyMap />
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
  );
};
