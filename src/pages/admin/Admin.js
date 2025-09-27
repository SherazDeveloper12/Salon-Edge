import AdminNavbar from '../../components/adminNavbar/AdminNavbar'
import Styles from '../../pages/admin/admin.module.css'
export default function Admin(){
    return (
      <div className={Styles.admin}>
        <div className={Styles.AdminNavbar}> <AdminNavbar /></div>
       <div className={Styles.adminContainer}> <h1>Admin Dashboard</h1>
        <p>Welcome to the admin dashboard. Here you can manage users, products, and view analytics.</p>
       </div>
       
    </div>
    )}