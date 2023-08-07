import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../auth/Login";
import Signup from "../auth/Signup";
import Logout from "../auth/Logout";
import Home from "../home/Home";
import Protected from "../auth/Protected";
import Navbar from "../navbar/Navbar";

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
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
