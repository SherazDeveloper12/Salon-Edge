import Admin from "../../pages/admin/Admin"
import { GoTriangleLeft } from "react-icons/go";
import { ImUsers } from "react-icons/im";
import { FaTachometerAlt } from "react-icons/fa";
import Styles from '../adminNavbar/adminNavbar.module.css'
import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
export default function AdminNavbar() {
    const [ActiveTab, SetActiveTab] = useState('Dashboard')
    const location = useLocation()
    useEffect(() => {
        const path = location.pathname
        if (path === '/dashboard') { SetActiveTab("Dashboard") }
        else if (path === '/') { SetActiveTab("Home") }
        if (path === '/admin/services') { SetActiveTab("services") }
        if (path === '/admin/bookings') { SetActiveTab("Bookings") }
        if (path === '/admin/stylists') { SetActiveTab("stylists") }
    }, [location.pathname])

    console.log("activetab is", ActiveTab)
    return (
        <div className={Styles.AdminNavbar}>
            <nav>
                <ul>
                    <li>
                        <Link className={ActiveTab === "Dashboard" ? Styles.active : ""} to="/admin"><FaTachometerAlt /> Dashboard   {ActiveTab === "Dashboard" && (<GoTriangleLeft className={Styles.triangle} />)}</Link>
                        
                        </li>
                    <li><Link className={`ActiveTab === "Home" ? Styles.active : "" Styles.tab`} to="/">Home  {ActiveTab === "Home" && (<GoTriangleLeft className={Styles.triangle} />)}</Link></li>
                    <li><Link className={ActiveTab === "services" ? Styles.active : ""} to="/admin/services">Services  {ActiveTab === "services" && (<GoTriangleLeft className={Styles.triangle} />)}</Link></li> 
                    <li><Link className={ActiveTab === "Bookings" ? Styles.active : ""} to="/admin/bookings">Bookings   {ActiveTab === "Bookings" && (<GoTriangleLeft className={Styles.triangle} />)}</Link></li>
                    <li>   <Link className={ActiveTab === "stylists" ? Styles.active : ""} to="/admin/stylists"><ImUsers />Stylists   {ActiveTab === "stylists" && (<GoTriangleLeft className={Styles.triangle} />)}</Link></li>
                </ul>
            </nav>
           
        </div>
    )
}