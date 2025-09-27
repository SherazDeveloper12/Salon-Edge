
import AdminNavbar from "../../../../components/adminNavbar/AdminNavbar"
import Styles from './bookings.module.css'
import { useState } from 'react'
export default function AdminBookings() {


    return (
        <div className={Styles.Bookings}>
            <div className={Styles.AdminNavbar}> <AdminNavbar  /></div>
            <div className={Styles.Bookings_container}>

            </div>

        </div>
    )
}