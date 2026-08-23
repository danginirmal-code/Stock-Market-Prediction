import {  useContext, useState } from "react";
import { Menu } from "lucide-react";
import Button from "./Button";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const Header = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const {isLoggedIn, setIsLoggedIn} = useContext(AuthContext)
  const navigate=useNavigate();

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  const handleLogout = (e) => {
    // Handle logout logic here
    e.preventDefault();
    setIsLoggedIn(false)
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark"
      style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
      }}
    >
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          <span className="text-info">Stock</span> Prediction Portal
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded={!isNavCollapsed ? true : false}
          aria-label="Toggle navigation"
          onClick={handleNavCollapse}
        >
          <Menu className="text-light" />
        </button>

        <div
          className={`${
            isNavCollapsed ? "collapse" : ""
          } navbar-collapse justify-content-end`}
          id="navbarNav"
        >
          <div className="d-flex ms-lg-3 mt-3 mt-lg-0">
            {isLoggedIn ? (
              <Button
                className="btn-outline-danger me-2"
                text="Logout"
                onClick={handleLogout}
              />
            ) : (
              <>
                <Button className="btn-info me-2" text="Login" to={"/login"} />
                <Button
                  className="btn-outline-info"
                  text="Register"
                  to={"/register"}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
