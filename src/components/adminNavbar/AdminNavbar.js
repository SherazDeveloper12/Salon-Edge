import { GoTriangleLeft } from "react-icons/go";
import Styles from "../adminNavbar/adminNavbar.module.css";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function AdminNavbar() {
  const [ActiveTab, SetActiveTab] = useState("Dashboard"); // Default to Dashboard
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    if (path === "/admin" || path === "/dashboard") {
      SetActiveTab("Dashboard");
    } else if (path === "/") {
      SetActiveTab("Home");
    } else if (path === "/admin/services") {
      SetActiveTab("services");
    } else if (path === "/admin/bookings") {
      SetActiveTab("Bookings");
    } else if (path === "/admin/stylists") {
      SetActiveTab("stylists");
    }
  }, [location.pathname]);

  return (
    <div className={Styles.AdminNavbar}>
      <nav>
        <ul>
          <li>
            <Link
              className={ActiveTab === "Dashboard" ? Styles.active : ""}
              to="/admin"
            >
              <img
                src={require("../../assets/admin dashboard.png")}
                alt="dashboard"
              />
              <p>Dashboard</p>
              {ActiveTab === "Dashboard" && (
                <GoTriangleLeft className={Styles.triangle} />
              )}
            </Link>
          </li>
          <li>
            <Link
              className={ActiveTab === "services" ? Styles.active : ""}
              to="/admin/services"
            >
              <img src={require("../../assets/admin services.png")} alt="services" />
              <p>Services</p>
              {ActiveTab === "services" && (
                <GoTriangleLeft className={Styles.triangle} />
              )}
            </Link>
          </li>
          <li>
            <Link
              className={ActiveTab === "Bookings" ? Styles.active : ""}
              to="/admin/bookings"
            >
              <img src={require("../../assets/admin bookings.png")} alt="bookings" />
              <p>Bookings</p>
              {ActiveTab === "Bookings" && (
                <GoTriangleLeft className={Styles.triangle} />
              )}
            </Link>
          </li>
          <li>
            <Link
              className={ActiveTab === "stylists" ? Styles.active : ""}
              to="/admin/stylists"
            >
              <img
                src={require("../../assets/stylists of admin.png")}
                alt="stylists"
              />
              <p>Stylists</p>
              {ActiveTab === "stylists" && (
                <GoTriangleLeft className={Styles.triangle} />
              )}
            </Link>
          </li>
          <li>
            <Link
              className={ActiveTab === "Home" ? Styles.active : ""}
              to="/"
            >
              <img src={require("../../assets/admin home.png")} alt="home" />
              <p>Home</p>
              {ActiveTab === "Home" && (
                <GoTriangleLeft className={Styles.triangle} />
              )}
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}